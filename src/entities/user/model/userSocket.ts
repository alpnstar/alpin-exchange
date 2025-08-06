import { UserAccountInfoUpdate } from "@/entities/user";

export enum UserSocketMethod {
  SESSION_LOGON = "session.logon",
  USER_DATA_SUBSCRIBE = "userDataStream.subscribe",
}

export enum UserSocketEvent {
  OUTBOUND_ACCOUNT_POSITION = "outboundAccountPosition",
  EXECUTION_REPORT = "executionReport",
}

export class UserSocket {
  private static instance: UserSocket | null = null;

  private socket: WebSocket | null = null;
  private url: string;
  private apiKey: string;
  private appUrl: string;
  private logonEventId: number;
  private listeners: Map<string, ((data: {event: UserAccountInfoUpdate}) => void)[]> = new Map();

  private isConnected = false;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;
  private readonly reconnectInterval = 5000; // 5 секунд

  private constructor() {
    this.url = process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET_API_URL!;
    this.apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY!;
    this.appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    this.logonEventId = Date.now();

    if (!this.url || !this.apiKey || !this.appUrl) {
      throw new Error(
        "WebSocket environment variables are not configured properly.",
      );
    }
  }

  public static getInstance(): UserSocket {
    if (!UserSocket.instance) {
      UserSocket.instance = new UserSocket();
    }
    return UserSocket.instance;
  }

  public connect(): void {
    if (this.isConnected && this.socket?.readyState === WebSocket.OPEN) {
      console.log("WebSocket is already connected.");
      return;
    }

    if (this.socket?.readyState === WebSocket.CONNECTING) {
      return;
    }

    this.socket = new WebSocket(this.url);
    this.attachEventListeners();
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  private attachEventListeners(): void {
    if (!this.socket) return;

    this.socket.onopen = () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.logon();
    };

    this.socket.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      this.handleReconnect();
    };
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectInterval * this.reconnectAttempts;
      console.log(`Attempting to reconnect in ${delay / 1000}s...`);
      setTimeout(() => this.connect(), delay);
    } else {
      console.error("Max reconnect attempts reached. Giving up.");
    }
  }

  private async logon(): Promise<void> {
    try {
      const authData = await this.getAuthSignature();
      this.sendMessage(UserSocketMethod.SESSION_LOGON, this.logonEventId, {
        apiKey: this.apiKey,
        timestamp: authData.timestamp,
        signature: authData.signature,
      });
    } catch (error) {
      console.error("WebSocket logon failed:", error);
      this.disconnect();
    }
  }

  private handleMessage(data: string): void {
    let message;
    try {
      message = JSON.parse(data);
    } catch (error) {
      console.error("Failed to parse WebSocket message:", data, error);
      return;
    }

    if (message.id === this.logonEventId && message.status === 200) {
      this.subscribeToUserData();
      return;
    } else if (message?.event?.e) {
      const eventType = message.event.e;
      if (eventType && this.listeners.has(eventType)) {
        this.listeners.get(eventType)?.forEach((callback) => {
          callback(message);
        });
      }
    }
  }

  private subscribeToUserData(): void {
    this.sendMessage(UserSocketMethod.USER_DATA_SUBSCRIBE, Date.now());
  }

  private async getAuthSignature(): Promise<{
    signature: string;
    timestamp: number;
  }> {
    const response = await fetch(`${this.appUrl}/api/binance/ws-auth`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch WebSocket auth signature.");
    }
    return response.json();
  }

  on(event: string, callback: (data: {event:UserAccountInfoUpdate}) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  off(event: string, callback: (data: {event:UserAccountInfoUpdate}) => void) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      this.listeners.set(
        event,
        callbacks.filter((cb) => cb !== callback),
      );
    }
  }

  public sendMessage(
    method: string,
    id: number,
    params: { [key: string]: string | number } = {},
  ): void {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }
    this.socket.send(JSON.stringify({ id, method, params }));
  }
}

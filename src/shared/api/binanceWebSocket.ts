export class BinanceWebSocket {
  private socket: WebSocket | null = null;
  private subscriptions: Set<string> = new Set();
  private messageHandlers: Map<string, (data: any) => void> = new Map();

  connect() {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      const websocketUrl = process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET_URL;

      if (!websocketUrl) {
        throw new Error(
          "WebSocket URL is not defined. Please set the NEXT_PUBLIC_BINANCE_WEBSOCKET_URL environment variable.",
        );
      }

      this.socket = new WebSocket(websocketUrl);

      this.socket.onopen = () => this.resubscribeAll();

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.result === null) return;
        let streamName = "";
        if (data.e === "kline") {
          streamName =
            `${data.s.toLowerCase()}@${data.e}${data.k ? `_${data.k?.i}` : ""}` ||
            "";
        } else if (data.e === "24hrTicker") {
          if (this.subscriptions.has(`${data.s.toLowerCase()}@ticker`)) {
            streamName = `${data.s.toLowerCase()}@ticker`;
          }
        } else if (
          Array.isArray(data) &&
          data[0].e === "24hrTicker" &&
          this.subscriptions.has(`!ticker@arr`)
        ) {
          streamName = "!ticker@arr";
        } else if (data.e === "depthUpdate") {
          streamName = `${data.s.toLowerCase()}@depth`;
        } else if (data.e === "aggTrade") {
          streamName = `${data.s.toLowerCase()}@aggTrade`;
        }
        const handler = this.messageHandlers.get(streamName);

        if (handler) handler(data);
      };

      this.socket.onerror = (error) => console.error("WebSocket Error:", error);

      this.socket.onclose = () => setTimeout(() => this.connect(), 5000);
    }

    return this.socket;
  }

  subscribe( streamName: string, handler: (data: any) => void) {
    this.subscriptions.add(streamName);
    this.messageHandlers.set(streamName, handler);

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [streamName],
          id: Date.now(),
        }),
      );
    }
  }

  unsubscribe(streamName: string) {
    this.subscriptions.delete(streamName);
    this.messageHandlers.delete(streamName);

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          method: "UNSUBSCRIBE",
          params: [streamName],
          id: Date.now(),
        }),
      );
    }
  }

  private resubscribeAll() {
    if (this.subscriptions.size === 0) return;

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: Array.from(this.subscriptions),
          id: Date.now(),
        }),
      );
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const binanceWebSocket = new BinanceWebSocket();

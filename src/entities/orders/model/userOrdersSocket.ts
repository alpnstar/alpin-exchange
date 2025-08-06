/*
export class UserOrdersWebSocket {
  private socket: WebSocket | null = null;

  async connect(symbol: string) {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      const url = process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET_URL;
      if (!url) {
        throw new Error(
          "WebSocket URL is not defined. Please set the NEXT_PUBLIC_BINANCE_WEBSOCKET_URL environment variable.",
        );
      }
      const authData = await fetch(
        process.env.NEXT_PUBLIC_APP_URL + "/api/binance/ws-auth",
        { method: "POST" },
      ).then((res) => res.json());
      this.socket = new WebSocket(url);
      this.socket.send(
        JSON.stringify({
          id: Date.now(),
          method: "openOrders.status",
          params: {
            symbol,
            timestamp: authData.timestamp,
            signature: authData.signature,
          },
        }),
      );

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
      };
    }
  }
}
*/

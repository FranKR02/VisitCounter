using Microsoft.AspNetCore.SignalR;

namespace VisitCounter.Hubs
{
    public class VisitHub : Hub
    {
        private static int connections = 0;
        public async Task CountVisitors()
        {
            Interlocked.Increment(ref connections);
            // Envía el conteo de visitantes a todos los clientes
            await Clients.All.SendAsync("ReceiveVisitorsCount", connections);
        }
        public override async Task OnConnectedAsync()
        {
            await Clients.AllExcept(Context.ConnectionId).SendAsync("NewConnection", Context.ConnectionId);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Clients.All.SendAsync("Connectionclose: " + Context.ConnectionId);
        }
    }
}

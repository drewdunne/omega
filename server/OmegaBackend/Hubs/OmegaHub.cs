using Microsoft.AspNetCore.SignalR;

namespace OmegaBackend.Hubs;

public class OmegaHub : Hub
{
  public async Task SendMessage(string testMessage)
    {
        await Clients.All.SendAsync("ReceiveMessage", testMessage);
    }
}

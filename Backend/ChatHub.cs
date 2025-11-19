// ChatHub.cs
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task JoinChannel(string channelName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, channelName);
    }

    public async Task SendMessage(string user, string message, string channel)
    {
        var msgObject = new
        {
            id = DateTime.Now.Ticks, 
            sender = user, 
            text = message
        };

        await Clients.Group(channel).SendAsync("ReceiveMessage", msgObject, channel);
    }
}
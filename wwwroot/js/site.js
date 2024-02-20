//CONEXION CON EL HUB
var connection = new signalR.HubConnectionBuilder().withUrl("/visitHub").build();
var visitNumber = document.getElementById("visitNumber");
connection.start().then(function () {
    console.log("Connectado al hub");
    // Una vez que la conexión se establece, se invoca el método CountVisitors
    connection.invoke("CountVisitors").catch(function (err) {
        console.error(err.toString());
    });
}).catch(function (err) {
    console.error(err.toString());
});

// Manejar el evento "ReceiveVisitorsCount" del servidor
connection.on("ReceiveVisitorsCount", function (visitorsCount) {
    console.log("Visitas:", visitorsCount);
    // Actualiza el contenido del párrafo con el valor devuelto por el servidor
    visitNumber.textContent = visitorsCount;
});

connection.on("NewConnection", function (connectionId) {
    console.log("Nueva conexión:", connectionId);
});

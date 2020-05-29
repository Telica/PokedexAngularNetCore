# PokedexAngularNetCore
Simple Pokedex viewer, using .net Core for the server side code and Angular for the client side code.

# Cloud Host

The application is hosted in Azure, [Link To Application](https://pokedexv220200528014157.azurewebsites.net/)

# Features.

- Consume PokeApi Services.
- Make a simple Rest Api in .net core.
- Consume the Api with client code in Angular.
- UI Develop in Angular.
- Basic Error Handling both in server and client.
- Basic Test for integration with Xunit.
- Cache in intermediate layer.
- Cloud Hosting Azure.

# Instructions to Deploy in Azure.

For the deploy in Azure, this requeriments are needed.

- Visual studio 2019.
- Node v14
- npm v6.14.4
- Have an Azure account or make a free one.
- .Net core 3.0

## Steps

1. Open Visual Studio And in the hierarchy Explorer found the proyect and right click -> Publish.
![publish1](https://i.imgur.com/8eT28ao.png)
2. Crate New App service.
![publish2](https://i.imgur.com/bVkbYYL.png)
3. Write a name for the service and click the create button.
![publish3](https://i.imgur.com/zMlSip6.png)
4. Ensure that the service is running in the cloud ( go to Azure portal -> web apps -> select the previously created app.
![publish4](https://i.imgur.com/4z8iDFq.png)
5. Click publish to deploy the code to the cloud app service.
![publish5](https://i.imgur.com/bzzMvgG.png)

using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Net.Http;
using Xunit;
using POKEDEXV2;
using System.Threading.Tasks;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Hosting;
using System.Net;

namespace PokedexV2Tests
{
    /// <summary>
    /// Basics Integration Tests, check that are a correct response to the client.
    /// </summary>
    public class IntegrationTest
    {
        public readonly HttpClient testClient;

        //Ensure suc
        [Fact]
        public async Task Get_EndpointsReturnSuccess()
        {
            var appFactory = new WebApplicationFactory<Startup>();

            // Arrange
            var client = appFactory.CreateClient();
            // Act
            var response = await client.GetAsync("/api/Pokemon");
            System.Diagnostics.Debug.WriteLine(response);
            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async Task Get_EndpointsReturnCorrectContent()
        {
            var appFactory = new WebApplicationFactory<Startup>();

            // Arrange
            var client = appFactory.CreateClient();

            // Act
            var response = await client.GetAsync("/api/Pokemon");

            // Assert
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }

    }
}

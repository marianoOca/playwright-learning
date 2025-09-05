import { test, expect } from "@playwright/test";

test("GET /products", async ({ request }) => {
  const apiURL = "https://api.practicesoftwaretesting.com";
  const response = await request.get(apiURL + "/products");

  expect(response.status()).toBe(200);
  const body = await response.json();
  // console.log(body); // al debuggear ver en consola qué pasa
  expect(body.data.length).toBe(9);
  expect(body.total).toBe(50);
});

test("POST /users/login", async ({ request }) => {
  const apiURL = "https://api.practicesoftwaretesting.com";
  const response = await request.post(apiURL + "/users/login", {
    data: {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.access_token).toBeTruthy();
});

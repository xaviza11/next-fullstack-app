import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Signup from "../../src/app/register/page";
import "@testing-library/jest-dom";
import Providers from "@/app/Providers";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

jest.mock("next/navigation");

const server = setupServer(
  http.post("/api/auth/signup", () => {
    return HttpResponse.json([{ success: true }]);
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});

fetchMock.mockResponseOnce(JSON.stringify({ data: "example" }));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();

  mockedAxios.post.mockResolvedValueOnce({
    data: { email: "test@example.com" },
  });

  render(
    <Providers>
      <Signup />
    </Providers>
  );
});

describe('RegisterPage_client', () => {
it("renders register page", () => {
  act(() => {
    const registerButton = screen.getByRole("button");
    expect(registerButton).toBeInTheDocument();
  });
});

it("open alert page when fullname is not valid and status equals warning", async () => {
  const fullNameInput = screen.getByTestId("fullNameInput");
  const emailInput = screen.getByTestId("emailInput");
  const passwordInput = screen.getByTestId("passwordInput");
  fireEvent.change(fullNameInput, { target: { value: "a" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "1" } });
  fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      const alertComp = screen.getByTestId("alertComp");
      expect(alertComp).toBeInTheDocument();
      expect(alertComp).toHaveClass("bg-yellow-500");
    });
  });

it("open alert page when password is not valid and status equals warning", async () => {
  const fullNameInput = screen.getByTestId("fullNameInput");
  const emailInput = screen.getByTestId("emailInput");
  const passwordInput = screen.getByTestId("passwordInput");
  fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "1" } });
  fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      const alertComp = screen.getByTestId("alertComp");
      expect(alertComp).toBeInTheDocument();
      expect(alertComp).toHaveClass("bg-yellow-500");
    });
  });
});

afterAll(() => server.close());

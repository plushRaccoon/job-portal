import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import React from "react";

describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    render(<App />);
    
    ['positions', 'candidates'].forEach(async (item) => {
      const header = screen.getByText(item.toUpperCase());
      const buttons = await screen.getAllByRole("button", { name: /create new/i });
      const accordion = screen.getByTestId(`${item}-accordion`);

      expect(header).toBeInTheDocument();
      expect(buttons.length).toBe(2);
      expect(accordion).toBeInTheDocument();
    });
  });
})

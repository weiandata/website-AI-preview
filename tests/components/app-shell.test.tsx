import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("application shell", () => {
  it("introduces the WEIAN DATA Skill library", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /WEIAN DATA/i })).toBeInTheDocument();
  });
});

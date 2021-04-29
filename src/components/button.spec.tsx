import { render } from "@testing-library/react";
import { Button } from "./button";

describe("<Button />", () => {
  it("should render OK with props", () => {
    const { getByText } = render(
      <Button canClick loading={false} actionText={"test"} />
    );
    getByText("test");
  });
  it("should not clicked button", () => {
    const { getByText, container } = render(
      <Button canClick={false} loading={true} actionText={"test"} />
    );
    expect(container.firstChild).toHaveClass("pointer-events-none");
    getByText("Loading...");
  });
});

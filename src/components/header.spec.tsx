import { render } from "@testing-library/react";
import React from "react";
import { Header } from "./header";

describe("<Header />", () => {
  const headerProps = {
    email: "e@s.h",
  };
  it("renders OK", () => {
    render(<Header {...headerProps} />);
  });
});

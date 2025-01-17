import { createContext } from "react";

export const DisableContext = createContext({
  disabled: false, // default value
  sectionDisableHandle: () => {}, // no-op function
});

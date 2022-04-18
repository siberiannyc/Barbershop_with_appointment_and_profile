import { styled } from "@mui/system";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Box } from "@mui/system";

export const Tab = styled(TabUnstyled)`
  font-family: Lato, sans-serif;
  color: #08282f;
  cursor: pointer;
  font-size: 1rem;
  ${"" /* font-weight: bold; */}
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  ${"" /* margin: 6px 6px; */}
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: center;

  &:hover {
    ${"" /* background-color: rgba(255, 255, 255, 0.2); */}
  }

  &:focus {
    ${"" /* border-radius: 10px; */}
    ${"" /* outline: 2px solid ${blue[200]}; */}
      ${"" /* outline-offset: 2px; */};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #08282f;
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: Lato, sans-serif;
  font-size: 1rem;
`;

export const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: #93b6c2;
  border-radius: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

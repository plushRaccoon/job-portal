import React from "react";
import { List, ListItem, ListItemText, Box } from "@mui/material";
import Divider from "@mui/material/Divider";

export const RenderPositionsData = ({ item }) => {
  return (
  <>
    {item.title}
    <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
    {item.status}
    <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
    Applied: {item.applications?.length || 0}
  </>
)}

export const RenderPositionsDetails = ({item}) => {
  return (
  <>
    {item.applications?.map((application) => {
      const { candidate: { firstName, lastName, email, phone }, cv, id } = application;
      return (
        <List key={id}>
          <ListItem>
            <ListItemText>
                <Box key={id}>
                  <Box display="flex" alignItems="center" marginBottom="10px">
                    {firstName} {lastName}
                    <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
                    {email}
                    <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
                    {phone}
                  </Box>
                  {cv}
                </Box>
            </ListItemText>
          </ListItem>
        </List>
      );
    })}
  </>
)}

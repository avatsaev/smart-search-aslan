import * as React from "react";
import { FilmLocation } from "@app/models";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Movie";
import ListItem from "@mui/material/ListItem";
export interface OwnProps {
  data: FilmLocation;
}

export const LocationListItem: React.FC<OwnProps> = ({ data }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${data.nom_tournage} - ${data.type_tournage}`}
        secondary={`${data.adresse_lieu} - ${data.annee_tournage}`}
      />
    </ListItem>
  );
};

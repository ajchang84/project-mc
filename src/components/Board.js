import { Grid } from "@material-ui/core";

// Type: 0: Nothing, 1: Item, 2: Card
// Item:
// detail： null, or ItemCard

const Board = () => {
  return (
    <Grid container style={{ height: "100%" }}>
      {[...Array(6)].map((e, i) => (
        <Grid key={i} container direction="row" justify="center">
          {[...Array(6)].map((e, i) => (
            <Grid style={{ border: "1px solid black" }} key={i}>
              O
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;

const db = require("../../db/connection");

exports.insertFavourite = async (guest_id, property_id) => {
  const queryStr =
    "INSERT INTO favourites (guest_id, property_id) VALUES($1, $2) RETURNING *";
  const values = [guest_id, property_id];

  const { rows: insertedFavourite } = await db.query(queryStr, values);

  return {
    favourite_id: insertedFavourite[0].favourite_id,
    msg: "Property favourited successfully.",
  };
};

exports.deleteFavourite = async (favourite_id) => {
  const queryStr = "DELETE FROM favourites WHERE favourite_id = $1 RETURNING *";
  const { rows } = await db.query(queryStr, [favourite_id]);
  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "property's favourite doesn't exist, no record deleted.",
    });
  }
};

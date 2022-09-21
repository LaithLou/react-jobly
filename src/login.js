import React, { useEffect, useState } from "react";

function login() {
  const [filedData, setFieldData] = useState("");
  return (
    <form>
      Name:
      <input
        type="text"
        name="name"
        value={filedData}
        onChange={(evt) => setFieldData(filedData + evt.target.value)}
      />
      password:
      <input type="text" name="password" />
      <input type="submit" value="Submit" />
    </form>
  );
}

const homePage = (req, res) => {
    res.status(200).send(`

    <h1>Hall Booking Task</h1>

    Endpoints:
    <h3> /rooms </h3>
    <h3> /:id </h3>
    <h3> /rooms/customer <h3>

     `);
  };
  
  export default { homePage }
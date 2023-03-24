import { Button } from "react-bootstrap";

const Index = (props) => {
  return (
    <Button
      type="submit"
      className="btn btn-danger py-2 w-100"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};

export default Index;

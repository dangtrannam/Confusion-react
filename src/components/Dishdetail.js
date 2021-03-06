import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./Loading";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const RenderDish = ({ dish }) => {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Card>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
};

const RenderComments = ({ comments, postComment, dishId }) => {
  function convertDateToCommentDateFormat(timestamp) {
    const date = new Date(Date.parse(timestamp));
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  let renderedComments;
  if (comments == null || comments.length === 0) {
    return <div></div>;
  } else {
    renderedComments = comments.map((comment) => {
      return (
        <Fade in>
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              -- {comment.author},{" "}
              {convertDateToCommentDateFormat(comment.date)}
            </p>
          </li>
        </Fade>
      );
    });
  }

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        <Stagger in>{renderedComments}</Stagger>
      </ul>
      <CommentModal dishId={dishId} postComment={postComment} />
    </div>
  );
};

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const CommentModal = (props) => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values) => {
    toggle();
    props.postComment(
      props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  };

  const closeBtn = (
    <Button className="close" onClick={toggle}>
      &times;
    </Button>
  );

  return (
    <React.Fragment>
      <Button outline color="secondary" onClick={toggle}>
        <i className="fa fa-pencil-square-o fa-lg"></i>
        Submit Comment
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="col-12" toggle={toggle} close={closeBtn}>
          <h3>Submit Comment</h3>
        </ModalHeader>
        <ModalBody className="col-12 col-md-9">
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="rating" md={12}>
                <h5>Rating</h5>
              </Label>
              <Col md={12}>
                <Control.select
                  model=".rating"
                  className="form-control"
                  name="rating"
                >
                  <option>Star</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="author" md={12}>
                <h5>Your Name</h5>
              </Label>
              <Col md={12}>
                <Control.text
                  className="form-control"
                  model=".author"
                  name="author"
                  id="author"
                  placeholder="Your name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="comment" md={12}>
                <h5>Comment</h5>
              </Label>
              <Col md={12}>
                <Control.textarea
                  className="form-control"
                  name="comment"
                  id="comment"
                  model=".comment"
                  rows="12"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

const DishDeltail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              {" "}
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDeltail;

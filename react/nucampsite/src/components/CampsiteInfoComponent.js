import React from 'react';
import {
  Button,
  Card,
  CardText,
  CardBody,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderCampsite(props) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={props.campsite.image} alt={props.campsite.name} />
        <CardBody>
          <CardText>{props.campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments(props) {
  if (props.comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {props.comments.map((comment, index) => {
          return (
            <div key={index}>
              <p>{comment.text}</p>
              <p>{comment.author} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
          );
        })}
        <CommentForm />
      </div>
    );
  }
  return '';
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
        <div className="container">
          <div className="row">
              <div className="col">
                <Breadcrumb>
                  <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{ props.campsite.name }</BreadcrumbItem>
                </Breadcrumb>
                <h2>{ props.campsite.name }</h2>
                <hr/>
              </div>
            </div>
            <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    );
  }
  return <div />;
}

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isModalOpen: false
    }
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen })

  handleSubmit = values => {
    alert(JSON.stringify(values));
    console.log(values);
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          Submit Comment &nbsp; <i className="fa fa-pencil" />
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control">
                      <option value="1" selected>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Rating</Label>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Author"
                    className="form-control"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                    }} />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
              </div>
              <div className="form-group">
                <Label htmlFor="comment">Rating</Label>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    placeholder="Comment" rows="6"
                    className="form-control"
                    validators={{}} />
                  {/* <Errors
                    className="text-danger"
                    model=".firstName"
                    show="touched"
                    component="div"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  /> */}
              </div>
              <Button type="submit" value="submit">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CampsiteInfo;

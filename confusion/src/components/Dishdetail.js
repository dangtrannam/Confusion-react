import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



const RenderDish = ({ dish }) => {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
};

const RenderComments = ({ comments }) => {
    function convertDateToCommentDateFormat(timestamp) {
        const date = new Date(Date.parse(timestamp));
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    let renderedComments;
    if (comments == null || comments.length === 0) {
        return (
            <div></div>
        );
    } else {
        renderedComments = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {convertDateToCommentDateFormat(comment.date)}</p>
                </li>
            );
        });
    }

    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {renderedComments}
            </ul>
        </div>
    );
};

const DishDeltail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                        
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDeltail;


import React, { Component } from 'react';
import Home from './Home';
import Menu from './Menu';
import Contact from './Contact';
import DishDetail from './Dishdetail';
import Header from './Header';
import Footer from "./Footer";
import About from './About';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

import { Switch, Route, Redirect } from 'react-router-dom';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS

        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter(dish => dish.featured)[0]}
                    promotion={this.state.promotions.filter(promo => promo.featured)[0]}
                    leader={this.state.leaders.filter(leader => leader.featured)[0]}
                />
            )
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                />
            )
        }

        const AboutUs = () => {
            return(
                <About leaders={this.state.leaders} />
            )
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/aboutus' component={AboutUs} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

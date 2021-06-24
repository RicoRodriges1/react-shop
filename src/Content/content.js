import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './content.css';
import { faTimes, faAngleDown, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import MapGL, {Marker} from 'react-map-gl';
import logo from './logo192.png';



class Content extends Component {
    
    state = {
        viewport: {
            latitude: 48.6785,
            longitude: 26.5853,
            zoom: 13
        },
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false,
        rest: false,
        food: false,
        sand: false, 
        pizz: false,
        status: "restaurants in Kamyanets-Podilsky",
        chosenSorting: "",
        appliedFilters: [],
        sortby_dropdown: false,
        "Recommended": false,
        "Highest rated": false,
        "Most Reviewed": false,
        locations: []

    }

    handleFilterBtn1Click = (e) => {
        const id = e.target.id;
        for (var btn in this.state) {
            if (btn === id) {
                this.setState({
                    [btn]: !this.state[btn]
                })
            }
        }
        if (e.target.className.indexOf(' active') === -1) {
            this.setState({
                appliedFilters: [...this.state.appliedFilters, " - ", e.target.name]
            })
        } else {
            this.setState({
                appliedFilters: [...this.state.appliedFilters.slice(0,this.state.appliedFilters.indexOf(e.target.name)-1),...this.state.appliedFilters.slice(this.state.appliedFilters.indexOf(e.target.name)+1)]
            })
        }
        console.log(this.state.appliedFilters);

    }

    sortbyDropdownHandler = (e) => {
        e.preventDefault();
        this.setState({
            sortby_dropdown: !this.state.sortby_dropdown
        })
    }

    handleSortbyChoice = (e) => {
        const id = e.target.id;
        if (id === "Recommended") {
            this.setState({
                [id]: !this.state[id],
                "Highest rated": false,
                "Most Reviewed": false,
                chosenSorting: id
            });
        }
        if (id === "Highest rated") {
            this.setState({
                [id]: !this.state[id],
                "Recommended": false,
                "Most Reviewed": false,
                chosenSorting: id
            });
        }
        if (id === "Most Reviewed") {
            this.setState({
                [id]: !this.state[id],
                "Recommended": false,
                "Highest rated": false,
                chosenSorting: id
            });
        }
        console.log(typeof this.state.chosenSorting);
    }

    checkboxHandler = (e) => {
        if (e.target.checked) {
            this.setState({
                appliedFilters: [...this.state.appliedFilters, " - ", e.target.name]
            })
        }
        if (!e.target.checked) {
            this.setState({
                appliedFilters: [...this.state.appliedFilters.slice(0,this.state.appliedFilters.indexOf(e.target.name)-1),...this.state.appliedFilters.slice(this.state.appliedFilters.indexOf(e.target.name)+1)]
            })
        }
    }

    buttonHandler = (e) => {

    }
    
    clearAllBtnHandler = (e) => {
        e.preventDefault();
        this.setState({
            appliedFilters: [],
            btn1: false,
            btn2: false,
            btn3: false,
            btn4: false,
            rest: false,
            food: false,
            sand: false, 
            pizz: false
        })
        document.getElementById('Open Now').checked = false;
        document.getElementById('Delivery').checked = false;
        document.getElementById('Ukrainian').checked = false;
        document.getElementById('Chinese').checked = false;
        document.getElementById('Good for Kids').checked = false;
        document.getElementById('Good for Groups').checked = false;
        document.getElementById('Has TV').checked = false;
        document.getElementById('Center').checked = false;
        document.getElementById('Polski filvarky').checked = false;
        document.getElementById('Ruski filvarky').checked = false;

    }

    allRests = {
        'rest1': {'$$':true, location: {longitude:26.592574, latitude:48.673642}, name: "pashtet", 'Ukrainian': true, 'Delivery': false,  'Has TV': false, 'Good for Kids': true, 'Good for groups': true, 'Center': true, rating: 4, reviews: 500, recommended: true},
        'rest2': {'$':true, location: {longitude:26.589675, latitude:48.676589}, name: "sakura", 'Chinese': true, 'Delivery': true, 'Has TV': true, 'Good for Kids': true, 'Good for Groups': false, 'Ruski filvarky': true, rating: 3, reviews: 1000, recommended: false},
        'rest3': {'$$$':true, location: {longitude:26.592916, latitude:48.684158}, name: "city blues", 'Ukrainian': true, 'Delivery': true,  'Has TV': true, 'Good for Kids': false, 'Good for Groups': true, 'Polski filvarky': true, rating: 5, reviews: 700, recommended: false},
    }
    
    showRestaurants = () => {
        let clearedFilters = []; 
        for(let filter in this.state.appliedFilters) {
            if (this.state.appliedFilters[filter] !== " - ") {
                clearedFilters.push(this.state.appliedFilters[filter]);   
            }
        }
        let filteredRests = [];               /* якшо рест має всі вибрані фільтри, то ми його додаємо */
            for(let rest in this.allRests) {
                for(let key in this.allRests[rest]) {
                    for(let filter in clearedFilters) {
                        if (clearedFilters[filter] === key) {
                            filteredRests.push(rest);
                        }
                }
            }
        }

        filteredRests = [...new Set(filteredRests)];

        let filteredRestsObj = [];
        for (let rest in filteredRests) {
            for (let rests in Object.keys(this.allRests)) {
                if (Object.keys(this.allRests)[rests] === filteredRests[rest]) {
                    filteredRestsObj.push(this.allRests[Object.keys(this.allRests)[rests]])
                }
            }
        }

        if (this.state.chosenSorting === "Highest rated") {
            filteredRestsObj.sort((a, b) => a.rating < b.rating ? 1 : -1);
        }
        if (this.state.chosenSorting === "Most Reviewed") {
            filteredRestsObj.sort((a, b) => a.reviews < b.reviews ? 1 : -1);
        }
        if (this.state.chosenSorting === "Recommeded") {
            let arr =[];
            for (let rest in filteredRestsObj) {
                if (filteredRestsObj[rest].recommended) {
                    arr.unshift(filteredRestsObj[rest]);
                }
                else {
                    arr.pop(filteredRestsObj[rest]);
                }
            }
            filteredRestsObj = arr;
        }
        return(
            filteredRestsObj
        )
    }

    renderMarkers = (filteredRestsObj = this.showRestaurants()) => {
        let markers = [];
        filteredRestsObj.map(rest => (
            markers.push(
                <Marker 
                    key={rest.name} 
                    longitude={rest.location.longitude} 
                    latitude={rest.location.latitude} >
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                </Marker>
            )
        ))
        return(
            markers
        )

    }

    renderRests = (filteredRestsObj = this.showRestaurants()) => {
        let result = [];
        filteredRestsObj.map(rest => (
            result.push(
                <div key={rest.name} className="restaurant">
                    <div className="rest_img">
                        <img src={logo} alt="" className="logo"></img>
                    </div>
                    <div className="rest_info">
                        <div className="info_header">
                            <div className="name_stars">
                                <h2 className="rest_name">{rest.name}</h2>
                                <div className="rest_stars">
                                    {rest.rating} stars
                                </div>
                            </div>
                            <div className="rest_adress">
                                <h4>country</h4>
                                <h4>city</h4>
                                <h4>street</h4>
                            </div>
                        </div>
                        <div className="info_info">
                            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.
                        </div>
                    </div>
                    
                </div>

            )
        ))
        return(
            result
        )
    }




    render() {


        let btn1 = "btn1";
        let btn2 = "btn2";
        let btn3 = "btn3";
        let btn4 = "btn4";
        let rest = "rest";
        let food = "food";
        let pizz = "pizz";
        let sand = "sand";
        
        if(this.state.btn1) {
            btn1 += " active";
        } else {
            btn1 = "btn1";
        }
        if(this.state[btn2]) {
            btn2 += " active";
        } else {
            btn2 = "btn2";
        }
        if(this.state.btn3) {
            btn3 += " active";
        } else {
            btn3 = "btn3";
        }
        if(this.state[btn4]) {
            btn4 += " active";
        } else {
            btn4 = "btn4";
        }
        if(this.state[rest]) {
            rest += " active";
        } else {
            rest = "rest";
        }
        if(this.state[food]) {
            food += " active";
        } else {
            food = "food";
        }
        if(this.state[pizz]) {
            pizz += " active";
        } else {
            pizz = "pizz";
        }
        if(this.state[sand]) {
            sand += " active";
        } else {
            sand = "sand";
        }

        let sortby_content = "sortby_content";
        if (this.state.sortby_dropdown) {
            sortby_content += " show"
        } else {
            sortby_content = "sortby_content";
        }

        let Recommended = "";
        let MReviewed = "";
        let HRated = "";

        if (this.state['Highest rated']) {
            HRated += "chosen";
        } else {
            HRated = "";
        }
        if (this.state['Most Reviewed']) {
            MReviewed += "chosen";
        } else {
            MReviewed = "";
        }
        if (this.state['Recommended']) {
            Recommended += "chosen";
        } else {
            Recommended = "";
        }

        let numberOfFilters = Math.ceil(this.state.appliedFilters.length/2);
        let namesOfFilters = this.state.appliedFilters;
        let filters = "";
        let clearall_btn = "clearall_btn";

        if (numberOfFilters === 0) {
            numberOfFilters = "";
            filters = "";
            clearall_btn = "clearall_btn";

        }
        if (numberOfFilters === 1) {
            filters = "filter";
            clearall_btn += " active";
        } 
        if (numberOfFilters > 1) {
            filters = "filters";
            clearall_btn += " active";
        }



        return (
            <div className="container1">
                <div className="left">
                    <div className="applied_filters">
                        <h3>{numberOfFilters} {filters}</h3>
                        <p>{namesOfFilters}</p>
                        <a href="#" className={clearall_btn}  onClick={this.clearAllBtnHandler}>Clear all</a>
                    </div>
                    <div className="filters">
                        <h3>Filters</h3>
                        <button className={btn1} id="btn1" name="$" type="button" onClick={this.handleFilterBtn1Click}>$</button>
                        <button className={btn2} id="btn2" name="$$" type="button" onClick={this.handleFilterBtn1Click}>$$</button> 
                        <button className={btn3} id="btn3" name="$$$" type="button" onClick={this.handleFilterBtn1Click}>$$$</button> 
                        <button className={btn4} id="btn4" name="$$$$" type="button" onClick={this.handleFilterBtn1Click}>$$$$</button>  
                    </div>
                    <div className="suggested">
                        <h3>Suggested</h3>
                        <div className="box">
                            <input type="checkbox" className="checkbox" id="Open Now" name="Open Now" onChange={this.checkboxHandler}/>
                            <label for="Open Now">Open Now</label>
                        </div>
                        <div className="box">
                            <input type="checkbox" className="checkbox" id="Delivery" name="Delivery" onChange={this.checkboxHandler}/>
                            <label for="Delivery">Delivery</label>
                        </div>
                        <div className="box">
                            <input type="checkbox" className="checkbox" id="Ukrainian" name="Ukrainian" onChange={this.checkboxHandler}/>
                            <label for="Ukrainian">Ukrainian</label>
                        </div>
                        <div className="box">
                            <input type="checkbox" className="checkbox" id="Chinese" name="Chinese" onChange={this.checkboxHandler}/>
                            <label for="Chinese">Chinese</label>
                        </div>
                    </div>
                    <div className="category">
                        <h3>Category</h3>
                        <div className="btn-line1">
                            <button className={rest} id="rest" name="Restaurants" type="button" onClick={this.handleFilterBtn1Click}>Restaurants</button>
                            <button className={food} id="food" name="Food" type="button" onClick={this.handleFilterBtn1Click}>Food</button>
                        </div>
                        <div className="btn-line2">
                            <button className={sand} id="sand" name="Sandwiches" type="button" onClick={this.handleFilterBtn1Click}>Sandwiches</button>
                            <button className={pizz} id="pizz" name="Pizza" type="button" onClick={this.handleFilterBtn1Click}>Pizza</button>
                        </div>
                        <a href="#popup2" className="see-all">See all</a>
                        <div id="popup2" className="popup">
                            <a href="#header" className="popup__area"> </a>
                            <div className="popup__body">
                                <div className="popup__content">
                                    <div className="popup__header">
                                        <div className="popup__title">More Categories</div>
                                        <a href="#header" className="popup__close"><FontAwesomeIcon icon={faTimes} /></a>
                                    </div>
                                    <div className="popup__text">
                                        <div className="col2">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Smirnova" name="Smirnova" value="yes"/>
                                                <label for="Smirnova">Smirnova</label>
                                            </div>
                                        </div>
                                        <div className="col2">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Zhovtneve" name="Zhovtneve" value="yes"/>
                                                <label for="Zhovtneve">Zhovtneve</label>
                                            </div>
                                        </div>
                                        <div className="col2">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Pidzamche" name="Pidzamche" value="yes"/>
                                                <label for="Pidzamche">Pidzamche</label>
                                            </div>
                                        </div>
                                        <div className="col2">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Mikrorayon" name="Mikrorayon" value="yes"/>
                                                <label for="Mikrorayon">Mikrorayon</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="popup_search_btn" type="button" >Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="features">
                        <h3>Features</h3>
                        <div className="box">
                            <input type="checkbox" className="checkbox" id="Good for Kids" name="Good for Kids" value="yes" onChange={this.checkboxHandler}/>
                            <label for="Good for Kids">Good for Kids</label>
                        </div>
                        <div className="box">
                            <input type="checkbox" className="checkbox" id="Good for Groups" name="Good for Groups" value="yes" onChange={this.checkboxHandler}/>
                            <label for="Good for Groups">Good for Groups</label>
                        </div>
                        <div className="box last">
                            <input type="checkbox" className="checkbox" id="Has TV" name="Has TV" value="yes" onChange={this.checkboxHandler}/>
                            <label for="Has TV">Has TV</label>
                        </div>
                        <a href="#popup1" className="see-all">See all</a>
                        <div id="popup1" className="popup">
                            <a href="#header" className="popup__area"></a>
                            <div className="popup__body">
                                <div className="popup__content">
                                    <div className="popup__header">
                                        <div className="popup__title">More Features</div>
                                        <a href="#header" className="popup__close"><FontAwesomeIcon icon={faTimes} /></a>
                                    </div>
                                    <div className="popup__text">
                                        <div className="popup__chapter">
                                            <h4>Additional features</h4>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Kids1" name="Good for Kids" value="yes"/>
                                                <label for="Good for Kids1">Good for Kids</label>
                                            </div>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Groups1" name="Good for Groups" value="yes"/>
                                                <label for="Good for Groups1">Good for Groups</label>
                                            </div>
                                            <div className="box last">
                                                <input type="checkbox" className="checkbox" id="Has TV1" name="Has TV" value="yes"/>
                                                <label for="Has TV1">Has TV</label>
                                            </div>
                                        </div>
                                        <div className="popup__chapter">
                                            <h4>Additional features</h4>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Kids2" name="Good for Kids" value="yes"/>
                                                <label for="Good for Kids2">Good for Kids</label>
                                            </div>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Groups2" name="Good for Groups" value="yes"/>
                                                <label for="Good for Groups2">Good for Groups</label>
                                            </div>
                                            <div className="box last">
                                                <input type="checkbox" className="checkbox" id="Has TV2" name="Has TV" value="yes"/>
                                                <label for="Has TV2">Has TV</label>
                                            </div>
                                        </div>
                                        <div className="popup__chapter">
                                            <h4>Additional features</h4>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Kids3" name="Good for Kids" value="yes"/>
                                                <label for="Good for Kids3">Good for Kids</label>
                                            </div>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Groups3" name="Good for Groups" value="yes"/>
                                                <label for="Good for Groups3">Good for Groups</label>
                                            </div>
                                            <div className="box last">
                                                <input type="checkbox" className="checkbox" id="Has TV3" name="Has TV" value="yes"/>
                                                <label for="Has TV3">Has TV</label>
                                            </div>
                                        </div>
                                        <div className="popup__chapter">
                                            <h4>Additional features</h4>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Kids4" name="Good for Kids" value="yes"/>
                                                <label for="Good for Kids4">Good for Kids</label>
                                            </div>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Groups4" name="Good for Groups" value="yes"/>
                                                <label for="Good for Groups4">Good for Groups</label>
                                            </div>
                                            <div className="box last">
                                                <input type="checkbox" className="checkbox" id="Has TV4" name="Has TV" value="yes"/>
                                                <label for="Has TV4">Has TV</label>
                                            </div>
                                        </div>
                                        <div className="popup__chapter">
                                            <h4>Additional features</h4>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Kids4" name="Good for Kids" value="yes"/>
                                                <label for="Good for Kids4">Good for Kids</label>
                                            </div>
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Good for Groups4" name="Good for Groups" value="yes"/>
                                                <label for="Good for Groups4">Good for Groups</label>
                                            </div>
                                            <div className="box last">
                                                <input type="checkbox" className="checkbox" id="Has TV4" name="Has TV" value="yes"/>
                                                <label for="Has TV4">Has TV</label>
                                            </div>
                                        </div>

                                    </div>
                                    <button className="popup_search_btn" type="button" >Search</button>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className="neighborhoods">
                        <h3>Neighborhoods</h3>
                        <div className="box">
                            <input type="checkbox" className="checkbox" id="Center" name="Center" value="yes" onChange={this.checkboxHandler}/>
                            <label for="Center">Center</label>
                        </div>
                        <div className="box">
                            <input type="checkbox" className="checkbox" id="Polski filvarky" name="Polski filvarky" value="yes" onChange={this.checkboxHandler}/>
                            <label for="Polski filvarky">Pol'ski filvarky</label>
                        </div>
                        <div className="box last">
                            <input type="checkbox" className="checkbox" id="Ruski filvarky" name="Ruski filvarky" value="yes" onChange={this.checkboxHandler}/>
                            <label for="Ruski filvarky">Rus'ki filvarky</label>
                        </div>
                        <a href="#popup" className="see-all">See all</a>
                        <div id="popup" className="popup">
                            <a href="#header" className="popup__area"></a>
                            <div className="popup__body">
                                <div className="popup__content">
                                    <div className="popup__header">
                                        <div className="popup__title">More Neighborhoods</div>
                                        <a href="#header" className="popup__close"><FontAwesomeIcon icon={faTimes} /></a>
                                    </div>
                                    <div className="popup__text">
                                        <div className="col4">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Smirnova" name="Smirnova" value="yes"/>
                                                <label for="Smirnova">Smirnova</label>
                                            </div>
                                        </div>
                                        <div className="col4">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Zhovtneve" name="Zhovtneve" value="yes"/>
                                                <label for="Zhovtneve">Zhovtneve</label>
                                            </div>
                                        </div>
                                        <div className="col4">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Pidzamche" name="Pidzamche" value="yes"/>
                                                <label for="Pidzamche">Pidzamche</label>
                                            </div>
                                        </div>
                                        <div className="col4">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Mikrorayon" name="Mikrorayon" value="yes"/>
                                                <label for="Mikrorayon">Mikrorayon</label>
                                            </div>
                                        </div>
                                        <div className="col4">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Smirnova" name="Smirnova" value="yes"/>
                                                <label for="Smirnova">Smirnova</label>
                                            </div>
                                        </div>
                                        <div className="col4">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Zhovtneve" name="Zhovtneve" value="yes"/>
                                                <label for="Zhovtneve">Zhovtneve</label>
                                            </div>
                                        </div>
                                        <div className="col4">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Pidzamche" name="Pidzamche" value="yes"/>
                                                <label for="Pidzamche">Pidzamche</label>
                                            </div>
                                        </div>
                                        <div className="col4">
                                            <div className="box">
                                                <input type="checkbox" className="checkbox" id="Mikrorayon" name="Mikrorayon" value="yes"/>
                                                <label for="Mikrorayon">Mikrorayon</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="popup_search_btn" type="button" >Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="distance">
                        <h3>Distance</h3>
                        <div className="box">
                            <input className="radio" name="distance" type="radio" id="Bird's-eye View" value="car"/>
                            <label for="Bird's-eye View">Bird's-eye View</label>
                        </div>
                        <div className="box">
                            <input className="radio" name="distance" type="radio" id="Driving (8 km.)" value="car"/>
                            <label for="Driving (8 km.)">Driving (8 km.)</label>
                        </div>
                        <div className="box">
                            <input className="radio" name="distance" type="radio" id="Biking (4 km.)" value="bike"/>
                            <label for="Biking (4 km.)">Biking (4 km.)</label>
                        </div>
                        <div className="box">
                            <input className="radio" name="distance" type="radio" id="Walking (2 km.)" value="walkin"/>
                            <label for="Walking (2 km.)">Walking (2 km.)</label>
                        </div>
                        <div className="box">
                            <input className="radio" name="distance" type="radio" id="Within 4 blocks" value="<4blocks"/>
                            <label for="Within 4 blocks">Within 4 blocks</label>
                        </div>
                    </div>
                </div>
                <div className="center">
                    <div className="heading">
                        <div className="main__header">
                            <h2 className="status_header">{this.state.status}</h2>
                        </div>
                        <div className="sortby_dropdown">
                            Sort:
                            <a href="#" className="sortby_dropbtn" onClick={this.sortbyDropdownHandler}>{this.state.chosenSorting}<FontAwesomeIcon className="angledown" icon={faAngleDown}/></a>
                            <div className={sortby_content}>
                                <a href="#" className={HRated} id="Highest rated" onClick={this.handleSortbyChoice}>Highest rated</a>
                                <a href="#" className={Recommended} id="Recommended" onClick={this.handleSortbyChoice}>Recommended</a>
                                <a href="#" className={MReviewed} id="Most Reviewed" onClick={this.handleSortbyChoice}>Most Reviewed</a>
                            </div>
                        </div>
                    </div>
                    <div className="restaurants">
                        {this.renderRests()}
                    </div>
                </div>
                <div className="right">
                <MapGL
                    {...this.state.viewport}
                    width="100%"
                    height="80vh"
                    mapStyle="mapbox://styles/ricorodriges/ckpmqhiia5vjx17phq72odbuo"
                    onViewportChange={viewport => this.setState({viewport})}
                    mapboxApiAccessToken='pk.eyJ1Ijoicmljb3JvZHJpZ2VzIiwiYSI6ImNrcGlmd3c5bzA5bDMyb214NmZrNW1kaHIifQ.9nicPS2B9tuF6pyN3hAJWw'
                >
                    {this.renderMarkers()}
                </MapGL>
                </div>
            </div>
        );
    }
}

export default Content;
/*                   {Filtered_Rests.map(rest => (
                        <Marker
                            key={rest.name}
                            latitude={rest.location[0]}
                            longitude={rest.location[1]}
                        >
                            <FontAwesomeIcon icon={faMapMarker} /> 
                        </Marker>    
                    ))}*/
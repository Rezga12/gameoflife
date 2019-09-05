import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss"


class Cell extends React.Component{

    constructor(props){
        super(props);

    }

   shouldComponentUpdate(nextProps, nextState) {



        return nextProps.size !== this.props.size || this.props.className !== nextProps.className;
    }


    render() {

        const cell_style = {
            width:this.props.size,
            height:this.props.size,
        };



        return <div className={this.props.className} style={cell_style} onClick={this.props.onClick}/>
    }

}


class Container extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cells: new Array(this.props.width * this.props.height).fill(0),
            intervalID: -1,
            isGenerating: false,
            width: props.width,
            height: props.height,
        };

    }


    render(){

        const cellSize = Math.floor(this.props.pxWidth/this.state.width);
        //console.log(cellSize + " " + this.state.width);

        const cells = [];

        for(let i=0;i< this.state.height;i++){
            for(let j=0;j< this.state.width;j++){
                let className;
                if(j === this.state.height - 1 && i === this.state.width - 1) {
                    className = 'cell';
                }else if(j === this.state.width - 1){
                    className = 'cell border-bottom';
                }else if(i === this.state.height - 1){
                    className = 'cell border-right';
                }else{
                    className = 'cell border-bottom border-right';
                }

                if(this.state.cells[this.state.width * i + j] === 1){
                    className += " selected-color-early";
                }else if(this.state.cells[this.state.width * i + j] === 2){
                    className += " selected-color";
                }

                cells.push(
                    <Cell key = {i+' '+j} className = {className} size = {cellSize} onClick = {()=>this.handleClick(i,j)}/>
                );
            }

        }


        const container_style = {
            width: `${cellSize * this.state.width}px`,
            height: `${cellSize * this.state.width}px`,

        };



        let start_class;
        let stop_class;

        if(this.state.isGenerating){
            start_class = 'disabled-button';
            stop_class = 'button';
        }else{
            start_class = 'button';
            stop_class = 'disabled-button';
        }


        return (
            <div className={'container-main'}>
                <div className={'container'} style = {container_style}>
                    {cells}
                </div>
                <div className={'interface'}>
                    <div className={'count-container'}>
                        <div className={'label'}>
                            Generations:
                        </div>
                        <div className={'label'}>
                            live Cells:
                        </div>
                    </div>
                    <div className={'button-container'}>
                        <div className={start_class} onClick={this.handleStartClick}>
                            Start
                        </div>
                        <div className={stop_class} onClick={this.handleStopClick}>
                            Stop
                        </div>
                    </div>
                    <div className = {'button-container'}>
                        <div className={'button'}>
                            Clear
                        </div>
                    </div>
                    <div className = {'button-container'}>
                        <div className={'button'}>
                            Randomize
                        </div>
                    </div>
                    <div className={'slider-container'}>
                        <div className={'label'}>Speed: </div>
                        <Slider value = {40} trackWidth = {200} thumbWidth = {10} onValueChanged = {()=>{}}/>
                    </div>
                    <div className={'slider-container'}>
                        <div className={'label'}>Size: </div>
                        <Slider value = {40} trackWidth = {200} thumbWidth = {10} onValueChanged = {(value) => this.handleValueChanged(value)}/>
                    </div>
                    <div className={'checkbox-container'}>
                        <div className={'label'}>borders: </div>
                        <input className={'checkbox'} type={'checkbox'}/>
                    </div>
                </div>

            </div>


        );
    }

    handleValueChanged(value){
        const totalDim = Math.round(20 + value / 5);


        this.setState({
            cells: new Array(totalDim * totalDim).fill(0),
            width:totalDim,
            height:totalDim,
        });
    }

    handleClick(i,j){
        const new_arr = this.state.cells.slice();
        new_arr[this.state.width * i + j] = (new_arr[this.state.width * i + j] + 1) % 2;
        this.setState({cells: new_arr});
    }



    timeStep(){

        const new_arr = this.state.cells.slice();

        for(let i=0;i<this.state.height;i++) {
            for (let j = 0; j < this.state.width; j++) {

                const numNeighbours = this.countNeighbours(i,j);

                if(this.getArrayByIndex(i,j) > 0){
                    if(numNeighbours === 3 || numNeighbours === 2){
                        new_arr[this.state.width * i + j] = 2;
                    }else{
                        new_arr[this.state.width * i + j] = 0;
                    }
                }else{
                    if(numNeighbours === 3){
                        new_arr[this.state.width * i + j] = 1;
                    }
                }

            }
        }



        this.setState({cells : new_arr});


    }


    handleStartClick = () => {

        const func = () => window.requestAnimationFrame(() => this.timeStep());

        this.setState({
            cells: this.state.cells,
            intervalID: setInterval(func,100),
            isGenerating: true,
        });
        //


    };

    handleStopClick = () =>{
        if(this.state.intervalID === -1){
            return;
        }
        clearInterval(this.state.intervalID);

        this.setState({
            cells: this.state.cells,
            intervalID: -1,
            isGenerating: false,
        });
    };

    getArrayByIndex(i,j){

        if(i < 0){
            i = this.state.height + i;
        }else if(i >= this.state.height){
            i = i - this.state.height;
        }

        if(j < 0){
            j = this.state.width + j;
        }else if(j >= this.state.width){
            j = j - this.state.width;
        }

        return this.state.cells[this.state.width * i + j];
    }

    countNeighbours(x,y){
        const Dx = [-1,-1,1,1,1,-1,0,0];
        const Dy = [1,-1,1,0,-1,0,1,-1];

        let count = 0;

        for(let i=0;i<8;i++){

            if(this.getArrayByIndex(x+Dx[i],y+Dy[i]) > 0){
                count ++;
            }

        }

        return count;

    }




}

class Slider extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value : this.props.value,
            progress : this.props.trackWidth / 100 * this.props.value,
            isDragging : false,
            prevX : -1,
        };


        this.props.onValueChanged(this.props.value);


    }

    componentDidMount() {
        document.addEventListener('mousemove',e => this.handleMouseMove(e));
        document.addEventListener('mouseup', e => this.handleThumbUp(e));
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove',e => this.handleMouseMove(e));
        document.removeEventListener('mouseup', e => this.handleThumbUp(e));
    }

    render(){

        const offset = this.state.progress - this.props.thumbWidth / 2 - 1;
        const len = offset < 0 ? 0 : offset;

        let className = "thumb";
        if(this.state.isDragging){
            className += " big-focus";
        }

        return (
            <div className={'track'} style = {{width : this.props.trackWidth}}>
                <div className={className}
                     style={{left : `${offset}px`,width : this.props.thumbWidth}}
                     onMouseDown={e => this.handleThumbDown(e)}/>
                <div className={'fill'} style ={{width:`${len}px`}}/>

            </div>
        )
    }

    handleThumbDown(e){
        //console.log(e);
        this.setState({
            value : this.state.value,
            isDragging : true,
            prevX : e.clientX,
        });
    }

    handleThumbUp(){
        this.setState({
            value : this.state.value,
            isDragging : false,
            prevX : -1,
        });
    }

    handleMouseMove(e){

        if(!this.state.isDragging){
            return;
        }

        const diff = e.clientX - this.state.prevX;
        let progress = this.state.progress + diff;

        if(progress > this.props.trackWidth){
            progress = this.props.trackWidth;
        }
        if(progress < 0){
            progress = 0;
        }

        const value = progress / this.props.trackWidth * 100;
        //console.log(this.props);
        if(value !== this.state.value){
            this.props.onValueChanged(value);
        }


        this.setState({
            value : value,
            progress : progress,
            isDragging : true,
            prevX : e.clientX,
        });





    }

}



ReactDOM.render(
    <Container width={50} height = {50} pxWidth={500} pxHeight={500}/>,
    document.getElementById('root')
);
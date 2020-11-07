const { createElement, render, Component } = preact;
const h = createElement;



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Onjiary_Scripting'
        };
        this.keydownBind = this.keydown.bind(this);
    }

    componentDidMount(){
        if('alt' in window){
            alt.on('display:Name', this.displayName.bind(this));

            setTimeout(() => {
                alt.emit('ready');
            },500);
            alt.emit('ready');
        }

        window.addEventListener('keydown', this.keydownBind);
    }


    componentWillUnmount() {
        window.removeEventListener('keydown', this.keydownBind);
    }



    keydown(e){
        if(e.key === 'n') {
            if('alt' in window) {
                alt.emit('close:Webview');
            }else {
                console.log('Closing Window');
            }
        }
    }


    displayName(name){
        this.setState({name});
    }

    render(){
        return h('div', {}, this.state.name);
    }
}

render(h(App), document.querySelector('#render'));


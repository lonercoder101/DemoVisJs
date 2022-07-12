// https://visjs.org/
// onload -> Execute immediately after a page has been loaded.
onload = function () {

    // Creating a network
    const container = document.getElementById('container');
    const genNew = document.getElementById('generate-graph');

    // initialise graph options
    /* The settings for tweaking edges/nodes 
    can be found here https://visjs.github.io/vis-network/docs/network/nodes.html# */
    const options = {
        edges: {
            labelHighlightBold: true,
            font: {
                size: 18
            }
        },
        nodes: {
            font: '14px fangaso black',
            scaling: {
                label: true
            },
            // Custom icon instead of default nodes are taken from Font Awesome
            // Link : https://fontawesome.com/icons/city?s=solid
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf64f',
                size: 38,
                color: '#0C49F0',
            }
        }
    };

    // initialize your network!
    const network = new vis.Network(container);
    network.setOptions(options);

    function createData(){
        const cities = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K'];

        // Initialising number of nodes in graph.
        // (Math.random returns a value between 0 and 1, 
        // ensuring that the number of edges is greater than 3 and less than 10);
        const V = Math.floor(Math.random() * cities.length) + 3;
        if(V > 10) V = 9;

        // Preparing node data for Vis.js
        let vertices = [];
        for(let i=0;i<V;i++){
            vertices.push({id:i, label: cities[i]});
        }

        // Making edges for the graph for Vis.js
        let edges = [];
        for(let i=1;i<V;i++){
            // Picking a neighbour from 0 to i-1 to make edge to
            let neigh = Math.floor(Math.random()*i);

            // Adding the edge between node and neighbour
            edges.push({from: i, to: neigh, color: 'aqua',label: String(Math.floor(Math.random()*70)+43)});
        }

        //Preparing data object for Vis.js
        const data = {
            nodes: vertices,
            edges: edges
        };
        return data;
    }
    window.addEventListener("load", function(){
        let data = createData();
        network.setData(data);
        //everything is fully loaded, don't use me if you can use DOMContentLoaded
    });
    genNew.onclick = function () {
        // Creating and setting data to network
        let data = createData();
        network.setData(data);
    };

    genNew.click();
};
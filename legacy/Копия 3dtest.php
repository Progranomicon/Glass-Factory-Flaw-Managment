<html>
<head>
    <script type="text/javascript" src="js/Three.js"></script>
    <script type="text/javascript" src="js/ColladaLoader.js"></script>
    <script type="text/javascript" src="js/Detector.js"></script>
</head>    
<body>
<?php

?>
<script>
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    var camera, scene, renderer, geometry, material, mesh, loader, col_loader, dae;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 50;
        scene.add( camera );
        material = new THREE.MeshBasicMaterial( loadTexture('logo.png') );
        loader = new THREE.JSONLoader();
        col_loader= new THREE.ColladaLoader();
        col_loader.load('test_figure.dae', function (collada){
            dae = collada.scene;
            dae.scale.x = dae.scale.y = dae.scale.z = 25.0;
            scene.add(dae)})
        
        /*loader.load('js/ogr.js', function(geometry){
					mesh = new THREE.Mesh( geometry, material);
					scene.add( mesh );
                                        });*/
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );
        
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
        render();
        
    }

    function render() {

        
        mesh.rotation.z += 0.01;
        mesh.rotation.x += 0.01;
        renderer.render( scene, camera );

    }
    
    function loadTexture( path ) {

				var image = new Image();
				image.onload = function () { texture.needsUpdate = true; };
				image.src = path;

				var texture  = new THREE.Texture( image, new THREE.UVMapping(), THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.NearestFilter, THREE.LinearMipMapLinearFilter );

				return new THREE.MeshLambertMaterial( { map: texture, ambient: 0xbbbbbb } );

    }
</script>
</body>
</html>
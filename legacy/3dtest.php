<html>
<head>
    <script type="text/javascript" src="JS/Three.js"></script>
    <script type="text/javascript" src="JS/ColladaLoader.js"></script>
    <script type="text/javascript" src="JS/Detector.js"></script>
</head>    
<body>
<?php

?>
<script>
   if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats;

			var camera, scene, renderer, objects;
			var particleLight, pointLight;
			var dae, skin,dae2,skin2;

			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load( 'test_figure.dae', function colladaReady( collada ) {

				dae = collada.scene;
				skin = collada.skins[0];

				dae.scale.x = dae.scale.y = dae.scale.z = 0.75;
				dae.updateMatrix(); 

				init();
				animate();
			} );

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );
				container.style.background=0x888888;
				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 2, 2, 2 );
				scene.add( camera );
                                
				// Add the COLLADA

				scene.add( dae );
		
				// Lights

				pointLight = new THREE.PointLight( 0x888888, 2 );
				pointLight.position.set(4,4,6);
				scene.add( pointLight );

				renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild( renderer.domElement );

			}

			//

			var t = 0;
			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				var timer = Date.now() * 0.0005;
                                dae.rotation.y+=0.03;
				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}
			function add_collada(){
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load( 'test_figure2.dae', function colladaReady( collada ) {

				dae2 = collada.scene;
				skin2 = collada.skins[0];

				dae2.scale.x = dae2.scale.y = dae2.scale.z = 0.5;
				dae2.updateMatrix();
                                dae2.position.y = 1;
                                scene.add(dae2);
			} );
                        
                        }
                        function move_o(){dae2.position.set(-1, -1, 1);}
</script>
<br>
<!--<a href="javascript:add_collada()">�������� </a>|<a href="javascript:move_o();">�������� ������� </a>-->
</body>
</html>
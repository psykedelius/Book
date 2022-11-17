
const pouet = ()=>{console/log("pouet!")} ;



document.styleSheets[0].insertRule('canvas { outline:none; border:none; }', 0);
    //on import les libs
    import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
    import { OrbitControls } from 'https://unpkg.com/three@0.122.0/examples/jsm/controls/OrbitControls.js';
    import Stats from 'https://unpkg.com/three@0.122.0/examples/jsm/libs/stats.module'
    import { GLTFLoader } from 'https://unpkg.com/three@0.122.0/examples/jsm/loaders/GLTFLoader'
    import { TWEEN } from 'https://unpkg.com/three@0.122.0/examples/jsm/libs/tween.module.min'

    let canvasElement , scene,raycaster,renderer;
    let pointer = new THREE.Vector2();
    let camera,light,hemiLight;
    let controls;
    let currentModel = -1,geometry,material,modelUrl;
    var mouseDown = 0;
    let targetCam ;
    let cameraTrigger = {
        'trigger1':'camera1',
        'trigger2':'camera2',
        'trigger3':'camera3'
    };
    var mixer                = undefined;     // Three.JS AnimationMixer
    var Player_anim_IDLE     = undefined;    // Animation IDLE
    var Player_anim_RUN      = undefined;    // Animation RUN
    var MainPlayer           = undefined // Mesh

    function init(){
        // Reste du code
        // Création de la scène, de la caméra et du renderer
         canvasElement = document.getElementById('canvas');
         scene         = new THREE.Scene();
         raycaster;
         renderer      = new THREE.WebGLRenderer(
            {
                canvas: canvasElement,
                antialias: true,
                alpha: true,
                
            });
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.physicallyCorrectLights = true
        renderer.shadowMap.enabled = true;
        //Camera
        camera = new THREE.PerspectiveCamera(70, canvasElement.width / canvasElement.height, 0.1, 1000);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        camera.position.set(-10,8,10);
        
        //mouse over
        pointer   = new THREE.Vector2();
        raycaster = new THREE.Raycaster();

        document.addEventListener( 'mousemove', onPointerMove );
        renderer.domElement.addEventListener("click", onclick, true);
        //document.addEventListener('mousedown', onDocumentMouseDown, true);
        window.addEventListener( 'resize', onWindowResize );
        onWindowResize();
    }

 
        init();
        createLight();
        initOrbitCam();
        loadOnlineModel('./models/bio_chamber_unit.glb',false);
        

        const btn1 = document.getElementById("btn1")
        btn1.addEventListener("click", ()=>{
            loadOnlineModel('./models/character01.glb',false);
        });
        const btn2 = document.getElementById("btn2")
        btn2.addEventListener("click", ()=>{
            loadOnlineModel('./models/character02.glb',false);
        });



    function loadOnlineModel (glbUrl,isAdditive){
        currentModel = null;
        modelUrl     = glbUrl;
        const loader = new GLTFLoader()
        loader.load(modelUrl,
        function (gltf) {
            if (!isAdditive){scene.remove.apply(scene, scene.children);}
                scene.add(gltf.scene)
                currentModel = gltf.scene;
                gltf.scene.position.set(0, -3, 0);
                //setup des shadows
                gltf.scene.traverse(n => { if ( n.isMesh ) {
                    n.castShadow = true; 
                    n.receiveShadow = true;
                    if(n.material.map) n.material.map.anisotropy = 16; 
                    }});
                createLight();
                //load animation
                    // ---------------- ANIMATIONMIXER----------------
                    mixer = new THREE.AnimationMixer( gltf.scene );
                    //Anims
                    Player_anim_IDLE = gltf.animations[ 0] ; // first animation
                    Player_anim_RUN  = gltf.animations[ 1] ; // second animation
                    mixer.clipAction( Player_anim_IDLE).play();
                    //Mesh
                    MainPlayer = gltf.scene;
    

        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error);
        })
    }
    const gridHelper = new THREE.PolarGridHelper( 8, 16 );
	scene.add( gridHelper );
    function createLight (){
        hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 8);
        scene.add(hemiLight);
        light = new THREE.SpotLight(0xffa95c,4);
        light.position.set(-50,50,50);
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 1024*4;
        light.shadow.mapSize.height = 1024*4;
        scene.add( light );
        console.log('create light !');
    }

    function initOrbitCam(){
        //orbit controls
        controls    = new OrbitControls( camera, renderer.domElement );
        controls.panSpeed = 2;
        controls.rotateSpeed = 0.5;
        controls.minDistance = 4;
        controls.maxDistance = 10;
        controls.enablePan     = true;
        controls.enableDamping = true;
        controls.dampingFactor = 0.3;
    }

    var hoveredObjects = {};
    function onPointerMove( event ) {
        event.preventDefault();
        pointer.x =   ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y =  -( event.clientY / canvasElement.height ) * 2 + 1;
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / canvasElement.height;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth,canvasElement.height );
    }

    function onclick(event) {
        if (lastHoveredId != -1)
        {   
            controls.enabled = false;
            //on récupere la caméra correspondante
            //targetCam    = scene.getObjectByName( cameraTrigger[intersects[0].object.name],true) ;
            console.log('targetCam = '+targetCam.name)
            
            var object = scene.getObjectById( lastHoveredId, true );
            
            object.material.emissive.set('red');
            lastHoveredId = -1;
            moveCamTo (targetCam.position,currentModel.position);
            console.log('hover clic '+object.name);
            controls.enabled = true;
        }
        else{
            controls.enabled = true;
        }
    }

    function moveCamTo (cameraPos,targetPos)
    {
        
        console.log('moveCamTo '+camera.position.x+','+camera.position.y+' '+camera.position.z);
        //controls.target = targetPos;
        //const p = intersects[0].point
        new TWEEN.Tween(camera.position)
        .to(
          {
            x: cameraPos.x,
            y: cameraPos.y,
            z: cameraPos.z,
          },
          500,
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start()
    
      new TWEEN.Tween(controls.target)
        .to(
          {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
          },
          500,
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start()
    
    }

    let lastHoveredId = -1;

    function animate() {

        TWEEN.update();
        controls.update();
        light.position.set( 
            camera.position.x + 10,
            camera.position.y + 10,
            camera.position.z + 10,
          );
        
          //mouvement de la cam quand l'obit est desactivé
         //f = -ease * t * t + (1 + ease) * t); // ease [-1, 1]

        renderer.setClearColor( 0x000000, 0 ); // the default,

         //check mouseOver

        //on lance un rayon sous le curseur
        raycaster.setFromCamera( pointer, camera );
        //on récupere les objets touché
        const intersects = raycaster.intersectObjects(scene.children, true);
        //si la liste des objets touché est superieur à 0
        if (intersects.length>0){
            //si le nom de l'objet touché est dans la liste des cameraTrigger
            if (intersects[0].object.name in cameraTrigger){
                currentModel = intersects[0].object;
                //on récupere la caméra correspondante
                targetCam    = scene.getObjectByName( cameraTrigger[intersects[0].object.name],true) ;
                //console.log('targetCam = '+targetCam.name)
                
                if (lastHoveredId != currentModel.id)
                {
                    console.log(currentModel.id);
                    currentModel.material.emissive.set('grey');
                }
                lastHoveredId = currentModel.id;
            }
            //si le nom de l'objet touché n'est pas dans la liste des cameraTrigger
            else{
                if (lastHoveredId != -1)
                {
                    var object = scene.getObjectById( lastHoveredId, true );
                    object.material.emissive.set('black');
                    lastHoveredId = -1;
                    console.log('hover out');
                }
            }
        }
        renderer.render( scene, camera );
    }
    renderer.setAnimationLoop(animate);
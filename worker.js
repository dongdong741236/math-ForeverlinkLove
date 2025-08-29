// Cloudflare Worker script
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math.ForeverLink.Love - 用数学表达永恒的爱</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #1a0033 0%, #330011 100%);
            color: #fff;
            overflow: hidden;
            position: relative;
        }
        
        #canvas-container {
            width: 100vw;
            height: 100vh;
            position: relative;
        }
        
        .title {
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            z-index: 10;
            pointer-events: none;
        }
        
        .title h1 {
            font-size: 2.5em;
            font-weight: 300;
            letter-spacing: 0.1em;
            text-shadow: 0 0 20px rgba(255, 105, 180, 0.8);
            margin-bottom: 10px;
            background: linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .title p {
            font-size: 1.2em;
            color: rgba(255, 182, 193, 0.9);
            font-style: italic;
        }
        
        .equations {
            position: absolute;
            bottom: 30px;
            left: 30px;
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid rgba(255, 105, 180, 0.3);
            backdrop-filter: blur(10px);
            z-index: 10;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            color: rgba(255, 182, 193, 0.9);
            max-width: 400px;
        }
        
        .equations h3 {
            margin-bottom: 10px;
            color: #ff69b4;
        }
        
        @media (max-width: 768px) {
            .title h1 {
                font-size: 1.8em;
            }
            .equations {
                bottom: 10px;
                left: 10px;
                padding: 15px;
                font-size: 0.8em;
            }
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script" async></script>
</head>
<body>
    <div id="canvas-container"></div>
    
    <div class="title">
        <h1>Math.ForeverLink.Love</h1>
        <p>当数学遇见爱情，方程式绘出心的形状</p>
    </div>
    
    <div class="equations">
        <h3>爱的参数方程：</h3>
        <div>
            \[\begin{aligned}
            x &= \sin u\,\bigl(15\sin v - 4\sin 3v\bigr) \\
            y &= 8\cos u \\
            z &= \sin u\,\bigl(15\cos v - 5\cos 2v - 2\cos 3v - \cos v\bigr)
            \end{aligned}\]
        </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script>
        let scene, camera, renderer, controls;
        let pointCloud, solidMesh;
        let isPointCloud = true;
        let time = 0;
        let viewTime = 0;
        let orbitAngle = 0;
        const orbitRadius = 40;
        const orbitHeight = 8;
        
        function init() {
            // 创建场景
            scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0x1a0033, 10, 100);
            
            // 创建相机
            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.set(0, 8, 40);
            
            // 创建渲染器
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.getElementById('canvas-container').appendChild(renderer.domElement);
            
            // 添加控制器
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.autoRotate = false;
            controls.autoRotateSpeed = 0.5;
            
            // 添加光源
            const ambientLight = new THREE.AmbientLight(0xff69b4, 0.3);
            scene.add(ambientLight);
            
            const directionalLight1 = new THREE.DirectionalLight(0xff1493, 0.8);
            directionalLight1.position.set(10, 20, 10);
            directionalLight1.castShadow = true;
            scene.add(directionalLight1);
            
            const directionalLight2 = new THREE.DirectionalLight(0xff69b4, 0.5);
            directionalLight2.position.set(-10, 10, -10);
            scene.add(directionalLight2);
            
            const pointLight = new THREE.PointLight(0xffffff, 0.5);
            pointLight.position.set(0, 0, 0);
            scene.add(pointLight);
            
            // 创建心形
            createHeart();
            
            // 简化背景：移除粒子系统
            
            // 窗口大小调整
            window.addEventListener('resize', onWindowResize);
        }
        
        function createHeart() {
            const points = [];
            const colors = [];
            const uSegments = 80;
            const vSegments = 80;
            
            // 生成点
            for (let i = 0; i <= uSegments; i++) {
                for (let j = 0; j <= vSegments; j++) {
                    const u = (i / uSegments) * Math.PI * 2;
                    const v = (j / vSegments) * Math.PI * 2;
                    
                    const x = Math.sin(u) * (15 * Math.sin(v) - 4 * Math.sin(3 * v));
                    const y = 8 * Math.cos(u);
                    const z = Math.sin(u) * (15 * Math.cos(v) - 5 * Math.cos(2 * v) - 2 * Math.cos(3 * v) - Math.cos(v));
                    
                    points.push(new THREE.Vector3(x, y, z));
                    
                    // 根据位置设置颜色
                    const colorIntensity = (Math.sin(u) + 1) / 2;
                    const r = 1;
                    const g = 0.2 + colorIntensity * 0.3;
                    const b = 0.5 + colorIntensity * 0.3;
                    colors.push(r, g, b);
                }
            }
            
            // 创建点云
            const pointGeometry = new THREE.BufferGeometry().setFromPoints(points);
            pointGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            
            const pointMaterial = new THREE.PointsMaterial({
                size: 0.3,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            pointCloud = new THREE.Points(pointGeometry, pointMaterial);
            scene.add(pointCloud);
            
            // 创建实体网格
            const geometry = new THREE.ParametricGeometry((u, v, target) => {
                u *= Math.PI * 2;
                v *= Math.PI * 2;
                
                const x = Math.sin(u) * (15 * Math.sin(v) - 4 * Math.sin(3 * v));
                const y = 8 * Math.cos(u);
                const z = Math.sin(u) * (15 * Math.cos(v) - 5 * Math.cos(2 * v) - 2 * Math.cos(3 * v) - Math.cos(v));
                
                target.set(x, y, z);
            }, uSegments, vSegments);
            
            // 计算顶点颜色
            const meshColors = [];
            const positionAttribute = geometry.attributes.position;
            for (let i = 0; i < positionAttribute.count; i++) {
                const y = positionAttribute.getY(i);
                const colorIntensity = (y + 8) / 16;
                meshColors.push(1, 0.2 + colorIntensity * 0.3, 0.5 + colorIntensity * 0.3);
            }
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(meshColors, 3));
            
            const material = new THREE.MeshPhongMaterial({
                vertexColors: true,
                side: THREE.DoubleSide,
                shininess: 100,
                specular: 0xff69b4,
                emissive: 0x330011,
                emissiveIntensity: 0.2
            });
            
            solidMesh = new THREE.Mesh(geometry, material);
            solidMesh.castShadow = true;
            solidMesh.receiveShadow = true;
            solidMesh.visible = false;
            scene.add(solidMesh);
        }
        
        // 简化背景：无粒子函数
        
        function updateViewAndCamera() {
            viewTime += 0.01;
            
            // 每5秒切换一次视图模式（点云/实体）
            if (viewTime % 10 < 5) {
                if (!isPointCloud) {
                    isPointCloud = true;
                    if (pointCloud) pointCloud.visible = true;
                    if (solidMesh) solidMesh.visible = false;
                }
            } else {
                if (isPointCloud) {
                    isPointCloud = false;
                    if (pointCloud) pointCloud.visible = false;
                    if (solidMesh) solidMesh.visible = true;
                }
            }
            
            // 相机自动绕心形平滑旋转，保持心形可视
            orbitAngle += 0.003;
            const x = Math.sin(orbitAngle) * orbitRadius;
            const z = Math.cos(orbitAngle) * orbitRadius;
            const y = orbitHeight;
            camera.position.set(x, y, z);
            camera.lookAt(0, 0, 0);
        }
        
        
        function animate() {
            requestAnimationFrame(animate);
            
            time += 0.01;
            
            // 更新视图和相机
            updateViewAndCamera();
            
            // 更新控制器
            controls.update();
            
            // 心跳动画
            const scale = 1 + Math.sin(time * 2) * 0.02;
            if (pointCloud) pointCloud.scale.set(scale, scale, scale);
            if (solidMesh) solidMesh.scale.set(scale, scale, scale);
            
            // 点云动画
            if (pointCloud && pointCloud.visible) {
                pointCloud.material.size = 0.3 + Math.sin(time * 3) * 0.1;
            }
            
            renderer.render(scene, camera);
        }
        
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        // 初始化
        init();
        animate();
    </script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    return new Response(HTML_CONTENT, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function TempleGame() {
  const containerRef = useRef(null);
  const [foundLetters, setFoundLetters] = useState([]);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('Explore the vast temple! Avoid the moving guards and spike traps!');
  const [currentLetterPos, setCurrentLetterPos] = useState({ x: -50, z: 0 }); // Track current letter position
  const gameStateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    character: null,
    letters: [],
    guards: [],
    spikes: [],
    playerPos: { x: 0, y: 0, z: 70 },
    keys: {},
    clock: new THREE.Clock(),
    lastDamageTime: 0
  });

  useEffect(() => {
    const state = gameStateRef.current;
    
    // Scene setup
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0x0a0a15);
    state.scene.fog = new THREE.Fog(0x0a0a15, 50, 150);

    // Camera setup - HIGHER and WIDER view
    state.camera = new THREE.PerspectiveCamera(
      90, // Wider field of view
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    state.camera.position.set(0, 50, 90); // Much higher up and further back

    // Renderer setup
    state.renderer = new THREE.WebGLRenderer({ antialias: true });
    state.renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    state.renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(state.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    state.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(20, 40, 20);
    directionalLight.castShadow = true;
    state.scene.add(directionalLight);

    // HUGE Floor (150x150)
    const floorGeometry = new THREE.PlaneGeometry(150, 150);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4a3728,
      roughness: 0.9 
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    state.scene.add(floor);

    // Grid pattern on floor for better depth perception
    const gridHelper = new THREE.GridHelper(150, 30, 0x666666, 0x333333);
    gridHelper.position.y = 0.01;
    state.scene.add(gridHelper);

    // Outer Walls (much bigger)
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B6f47,
      roughness: 0.8 
    });

    const wallHeight = 15;
    const wallSize = 75;

    // Back wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(150, wallHeight, 2), wallMaterial);
    backWall.position.set(0, wallHeight/2, -wallSize);
    backWall.castShadow = true;
    state.scene.add(backWall);

    // Front wall
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(150, wallHeight, 2), wallMaterial);
    frontWall.position.set(0, wallHeight/2, wallSize);
    frontWall.castShadow = true;
    state.scene.add(frontWall);

    // Left wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(2, wallHeight, 150), wallMaterial);
    leftWall.position.set(-wallSize, wallHeight/2, 0);
    leftWall.castShadow = true;
    state.scene.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(2, wallHeight, 150), wallMaterial);
    rightWall.position.set(wallSize, wallHeight/2, 0);
    rightWall.castShadow = true;
    state.scene.add(rightWall);

    // Create maze-like inner walls
    const innerWalls = [
      // Horizontal walls
      { x: -30, z: 40, w: 40, h: 2 },
      { x: 30, z: 40, w: 40, h: 2 },
      { x: 0, z: 20, w: 30, h: 2 },
      { x: -40, z: 0, w: 30, h: 2 },
      { x: 40, z: 0, w: 30, h: 2 },
      { x: 0, z: -20, w: 50, h: 2 },
      { x: -30, z: -40, w: 35, h: 2 },
      { x: 35, z: -40, w: 30, h: 2 },
      
      // Vertical walls
      { x: -50, z: 20, w: 2, h: 30 },
      { x: 50, z: 20, w: 2, h: 30 },
      { x: -20, z: -10, w: 2, h: 25 },
      { x: 20, z: -10, w: 2, h: 25 },
      { x: 0, z: 50, w: 2, h: 20 },
    ];

    innerWalls.forEach(wall => {
      const wallMesh = new THREE.Mesh(
        new THREE.BoxGeometry(wall.w, 10, wall.h),
        wallMaterial
      );
      wallMesh.position.set(wall.x, 5, wall.z);
      wallMesh.castShadow = true;
      wallMesh.userData.isWall = true;
      state.scene.add(wallMesh);
    });

    // Many columns throughout the temple
    const columnPositions = [
      { x: -40, z: -40 }, { x: -20, z: -40 }, { x: 0, z: -40 }, { x: 20, z: -40 }, { x: 40, z: -40 },
      { x: -40, z: -20 }, { x: -20, z: -20 }, { x: 20, z: -20 }, { x: 40, z: -20 },
      { x: -40, z: 0 }, { x: -20, z: 0 }, { x: 20, z: 0 }, { x: 40, z: 0 },
      { x: -40, z: 20 }, { x: -20, z: 20 }, { x: 20, z: 20 }, { x: 40, z: 20 },
      { x: -40, z: 40 }, { x: -20, z: 40 }, { x: 0, z: 40 }, { x: 20, z: 40 }, { x: 40, z: 40 },
      { x: -60, z: -60 }, { x: 60, z: -60 }, { x: -60, z: 60 }, { x: 60, z: 60 },
    ];

    columnPositions.forEach(pos => {
      const columnGroup = new THREE.Group();
      
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1.5, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x6B5744 })
      );
      base.position.y = 0.75;
      columnGroup.add(base);

      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x8B7355 })
      );
      shaft.position.y = 7;
      shaft.castShadow = true;
      columnGroup.add(shaft);

      const capital = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x6B5744 })
      );
      capital.position.y = 13.5;
      columnGroup.add(capital);

      columnGroup.position.set(pos.x, 0, pos.z);
      columnGroup.userData.isWall = true;
      state.scene.add(columnGroup);
    });

    // Torches scattered around
    const torchPositions = [
      { x: -65, z: -65 }, { x: 65, z: -65 }, { x: -65, z: 65 }, { x: 65, z: 65 },
      { x: -50, z: 0 }, { x: 50, z: 0 }, { x: 0, z: -50 }, { x: 0, z: 50 },
      { x: -30, z: -30 }, { x: 30, z: -30 }, { x: -30, z: 30 }, { x: 30, z: 30 },
    ];

    torchPositions.forEach(pos => {
      const torchStand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x3d2817 })
      );
      torchStand.position.set(pos.x, 4, pos.z);
      state.scene.add(torchStand);

      const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: 0xFF4500,
          emissive: 0xFF4500,
          emissiveIntensity: 2 
        })
      );
      flame.position.set(pos.x, 8.5, pos.z);
      state.scene.add(flame);

      const light = new THREE.PointLight(0xFF4500, 3, 20);
      light.position.set(pos.x, 8.5, pos.z);
      state.scene.add(light);
    });

    // SPIKE TRAPS (stationary hazards)
    const spikePositions = [
      { x: -35, z: 25 }, { x: 35, z: 25 }, { x: -15, z: 10 },
      { x: 15, z: -25 }, { x: -45, z: -15 }, { x: 45, z: 15 },
      { x: 0, z: -50 }, { x: -25, z: 45 }, { x: 25, z: -45 },
      { x: -55, z: 35 }, { x: 55, z: -35 }
    ];

    spikePositions.forEach(pos => {
      const spikeGroup = new THREE.Group();
      
      // Create multiple spikes
      for (let i = 0; i < 9; i++) {
        const spike = new THREE.Mesh(
          new THREE.ConeGeometry(0.3, 2, 4),
          new THREE.MeshStandardMaterial({ 
            color: 0x666666,
            metalness: 0.8,
            roughness: 0.3
          })
        );
        const offsetX = (i % 3 - 1) * 0.8;
        const offsetZ = (Math.floor(i / 3) - 1) * 0.8;
        spike.position.set(offsetX, 1, offsetZ);
        spikeGroup.add(spike);
      }
      
      spikeGroup.position.set(pos.x, 0, pos.z);
      spikeGroup.userData.isDangerous = true;
      state.spikes.push(spikeGroup);
      state.scene.add(spikeGroup);
    });

    // MOVING GUARDS (13 patrolling enemies - increased from 6)
    const guardPaths = [
      { start: { x: -50, z: -50 }, end: { x: -50, z: 50 }, speed: 0.15 },
      { start: { x: 50, z: -50 }, end: { x: 50, z: 50 }, speed: 0.18 },
      { start: { x: -60, z: 0 }, end: { x: 60, z: 0 }, speed: 0.2 },
      { start: { x: 0, z: -60 }, end: { x: 0, z: 60 }, speed: 0.16 },
      { start: { x: -30, z: -30 }, end: { x: 30, z: 30 }, speed: 0.14 },
      { start: { x: -30, z: 30 }, end: { x: 30, z: -30 }, speed: 0.17 },
      // NEW GUARDS (7 more)
      { start: { x: -40, z: -60 }, end: { x: -40, z: 60 }, speed: 0.19 },
      { start: { x: 40, z: -60 }, end: { x: 40, z: 60 }, speed: 0.16 },
      { start: { x: -65, z: -30 }, end: { x: 65, z: -30 }, speed: 0.21 },
      { start: { x: -65, z: 30 }, end: { x: 65, z: 30 }, speed: 0.18 },
      { start: { x: 0, z: -40 }, end: { x: 0, z: 40 }, speed: 0.22 },
      { start: { x: -20, z: -50 }, end: { x: 20, z: 50 }, speed: 0.15 },
      { start: { x: 20, z: -50 }, end: { x: -20, z: 50 }, speed: 0.17 },
    ];

    guardPaths.forEach((path, idx) => {
      const guardGroup = new THREE.Group();
      
      // Guard body
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 2.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x8B0000 })
      );
      body.position.y = 1.5;
      guardGroup.add(body);

      // Guard head
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x8B0000 })
      );
      head.position.y = 3.2;
      guardGroup.add(head);

      // Glowing eyes
      const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: 0xFF0000,
          emissive: 0xFF0000,
          emissiveIntensity: 3
        })
      );
      leftEye.position.set(-0.3, 3.3, 0.5);
      guardGroup.add(leftEye);

      const rightEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: 0xFF0000,
          emissive: 0xFF0000,
          emissiveIntensity: 3
        })
      );
      rightEye.position.set(0.3, 3.3, 0.5);
      guardGroup.add(rightEye);

      // Warning light
      const warningLight = new THREE.PointLight(0xFF0000, 2, 8);
      warningLight.position.y = 3.5;
      guardGroup.add(warningLight);

      guardGroup.position.set(path.start.x, 0, path.start.z);
      guardGroup.userData = {
        isDangerous: true,
        path: path,
        direction: 1,
        speed: path.speed
      };
      
      state.guards.push(guardGroup);
      state.scene.add(guardGroup);
    });

    // Letters (ONE AT A TIME - appear in difficult/dangerous locations near guards)
    const letterData = [
      { id: 'C', x: -50, z: 0 },   // Near horizontal guard path
      { id: 'E', x: 0, z: -60 },   // Near vertical guard path
      { id: 'L', x: 30, z: 30 },   // Near diagonal guard path
      { id: 'O', x: -40, z: 50 }   // Near another guard patrol
    ];

    letterData.forEach((data, index) => {
      const letterMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 20),
        new THREE.MeshStandardMaterial({ 
          color: 0xFFD700,
          emissive: 0xFFD700,
          emissiveIntensity: 0.8,
          metalness: 0.9,
          roughness: 0.1 
        })
      );
      letterMesh.position.set(data.x, 2.5, data.z);
      letterMesh.userData = { 
        id: data.id, 
        collected: false,
        index: index,
        light: null
      };
      
      // Only first letter is visible at start
      letterMesh.visible = (index === 0);
      
      state.letters.push(letterMesh);
      state.scene.add(letterMesh);

      // Bright light around letter (only visible when letter is visible)
      const letterLight = new THREE.PointLight(0xFFD700, 3, 12);
      letterLight.position.set(data.x, 2.5, data.z);
      letterLight.visible = (index === 0);
      letterMesh.userData.light = letterLight;
      state.scene.add(letterLight);

      // ADD TALL BEAM MARKER above letter so you can see it from far away
      const beamGeometry = new THREE.CylinderGeometry(0.3, 0.3, 30, 8);
      const beamMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFF00,
        emissive: 0xFFFF00,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.6
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.set(data.x, 15, data.z);
      beam.visible = (index === 0);
      letterMesh.userData.beam = beam;
      state.scene.add(beam);

      // Top light on beam
      const beamTopLight = new THREE.PointLight(0xFFFF00, 4, 20);
      beamTopLight.position.set(data.x, 30, data.z);
      beamTopLight.visible = (index === 0);
      letterMesh.userData.beamLight = beamTopLight;
      state.scene.add(beamTopLight);
    });

    // Character (BIGGER and more visible)
    const characterGroup = new THREE.Group();
    
    // Main body - bigger
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1.2, 3.5, 12),
      new THREE.MeshStandardMaterial({ 
        color: 0x00BFFF,
        emissive: 0x0066CC,
        emissiveIntensity: 0.3
      })
    );
    body.position.y = 2;
    body.castShadow = true;
    characterGroup.add(body);

    // Head - bigger
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 20, 20),
      new THREE.MeshStandardMaterial({ 
        color: 0xFFDD99,
        emissive: 0xFF9944,
        emissiveIntensity: 0.2
      })
    );
    head.position.y = 4.5;
    head.castShadow = true;
    characterGroup.add(head);

    // Arms - bigger
    const leftArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 2.5, 12),
      new THREE.MeshStandardMaterial({ color: 0x00BFFF })
    );
    leftArm.position.set(-1.5, 2.5, 0);
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 2.5, 12),
      new THREE.MeshStandardMaterial({ color: 0x00BFFF })
    );
    rightArm.position.set(1.5, 2.5, 0);
    characterGroup.add(rightArm);

    // Legs - bigger
    const leftLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 2, 12),
      new THREE.MeshStandardMaterial({ color: 0x0088CC })
    );
    leftLeg.position.set(-0.6, 0.5, 0);
    characterGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 2, 12),
      new THREE.MeshStandardMaterial({ color: 0x0088CC })
    );
    rightLeg.position.set(0.6, 0.5, 0);
    characterGroup.add(rightLeg);

    // Small indicator above head
    const indicator = new THREE.Mesh(
      new THREE.ConeGeometry(0.8, 1.5, 4),
      new THREE.MeshStandardMaterial({ 
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 1.5
      })
    );
    indicator.position.y = 7;
    indicator.rotation.x = Math.PI;
    characterGroup.add(indicator);

    characterGroup.position.set(state.playerPos.x, 0, state.playerPos.z);
    state.character = characterGroup;
    state.scene.add(characterGroup);

    // Keyboard controls
    const handleKeyDown = (e) => {
      state.keys[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e) => {
      state.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (gameOver) {
        state.renderer.render(state.scene, state.camera);
        return;
      }

      const speed = 0.4;
      const time = state.clock.getElapsedTime();
      let newX = state.playerPos.x;
      let newZ = state.playerPos.z;

      // Movement
      if (state.keys['w'] || state.keys['arrowup']) {
        newZ -= speed;
      }
      if (state.keys['s'] || state.keys['arrowdown']) {
        newZ += speed;
      }
      if (state.keys['a'] || state.keys['arrowleft']) {
        newX -= speed;
      }
      if (state.keys['d'] || state.keys['arrowright']) {
        newX += speed;
      }

      // Boundary check
      newX = Math.max(-72, Math.min(72, newX));
      newZ = Math.max(-72, Math.min(72, newZ));

      // Simple wall collision (check against columns and walls)
      let collision = false;
      state.scene.children.forEach(obj => {
        if (obj.userData.isWall) {
          const distance = Math.sqrt(
            Math.pow(newX - obj.position.x, 2) +
            Math.pow(newZ - obj.position.z, 2)
          );
          if (distance < 3) {
            collision = true;
          }
        }
      });

      if (!collision) {
        state.playerPos.x = newX;
        state.playerPos.z = newZ;
      }

      // Update character
      state.character.position.set(state.playerPos.x, 0, state.playerPos.z);

      // Update camera to follow - HIGHER position
      state.camera.position.set(
        state.playerPos.x,
        45, // Higher up
        state.playerPos.z + 30 // Further back
      );
      state.camera.lookAt(state.playerPos.x, 0, state.playerPos.z);

      // Animate guards
      state.guards.forEach(guard => {
        const path = guard.userData.path;
        const direction = guard.userData.direction;
        
        if (direction === 1) {
          guard.position.x += (path.end.x - path.start.x) * guard.userData.speed * 0.01;
          guard.position.z += (path.end.z - path.start.z) * guard.userData.speed * 0.01;
          
          const distToEnd = Math.sqrt(
            Math.pow(guard.position.x - path.end.x, 2) +
            Math.pow(guard.position.z - path.end.z, 2)
          );
          if (distToEnd < 1) {
            guard.userData.direction = -1;
          }
        } else {
          guard.position.x -= (path.end.x - path.start.x) * guard.userData.speed * 0.01;
          guard.position.z -= (path.end.z - path.start.z) * guard.userData.speed * 0.01;
          
          const distToStart = Math.sqrt(
            Math.pow(guard.position.x - path.start.x, 2) +
            Math.pow(guard.position.z - path.start.z, 2)
          );
          if (distToStart < 1) {
            guard.userData.direction = 1;
          }
        }

        // Check collision with player
        const distToPlayer = Math.sqrt(
          Math.pow(state.playerPos.x - guard.position.x, 2) +
          Math.pow(state.playerPos.z - guard.position.z, 2)
        );
        
        if (distToPlayer < 2.5 && time - state.lastDamageTime > 1) {
          state.lastDamageTime = time;
          setHealth(prev => {
            const newHealth = Math.max(0, prev - 20);
            if (newHealth <= 0) {
              setGameOver(true);
              setMessage('💀 Game Over! You were caught by the guards!');
            } else {
              setMessage('⚠️ Hit by guard! Health: ' + newHealth + '%');
            }
            return newHealth;
          });
        }
      });

      // Check spike traps
      state.spikes.forEach(spike => {
        const distToPlayer = Math.sqrt(
          Math.pow(state.playerPos.x - spike.position.x, 2) +
          Math.pow(state.playerPos.z - spike.position.z, 2)
        );
        
        if (distToPlayer < 1.5 && time - state.lastDamageTime > 0.5) {
          state.lastDamageTime = time;
          setHealth(prev => {
            const newHealth = Math.max(0, prev - 10);
            if (newHealth <= 0) {
              setGameOver(true);
              setMessage('💀 Game Over! You fell onto spike traps!');
            } else {
              setMessage('⚠️ Spike damage! Health: ' + newHealth + '%');
            }
            return newHealth;
          });
        }
      });

      // Animate letters (only the currently visible one)
      state.letters.forEach((letter, idx) => {
        if (!letter.userData.collected && letter.visible) {
          letter.rotation.y += 0.03;
          letter.position.y = 2.5 + Math.sin(time * 2 + idx) * 0.4;

          const distance = Math.sqrt(
            Math.pow(state.playerPos.x - letter.position.x, 2) +
            Math.pow(state.playerPos.z - letter.position.z, 2)
          );

          if (distance < 2.5) {
            letter.userData.collected = true;
            letter.visible = false;
            
            // Hide the light for collected letter
            if (letter.userData.light) {
              letter.userData.light.visible = false;
            }
            
            // Hide the beam marker
            if (letter.userData.beam) {
              letter.userData.beam.visible = false;
            }
            
            // Hide beam top light
            if (letter.userData.beamLight) {
              letter.userData.beamLight.visible = false;
            }
            
            setFoundLetters(prev => {
              if (!prev.includes(letter.userData.id)) {
                const newLetters = [...prev, letter.userData.id];
                
                // Show next letter if there is one
                const nextIndex = letter.userData.index + 1;
                if (nextIndex < state.letters.length) {
                  const nextLetter = state.letters[nextIndex];
                  nextLetter.visible = true;
                  
                  if (nextLetter.userData.light) {
                    nextLetter.userData.light.visible = true;
                  }
                  
                  // Show beam marker for next letter
                  if (nextLetter.userData.beam) {
                    nextLetter.userData.beam.visible = true;
                  }
                  
                  if (nextLetter.userData.beamLight) {
                    nextLetter.userData.beamLight.visible = true;
                  }
                  
                  // Update current letter position for UI
                  setCurrentLetterPos({ x: nextLetter.position.x, z: nextLetter.position.z });
                  
                  setMessage(`✨ Found "${letter.userData.id}"! Look for the yellow beam - next letter appeared!`);
                } else {
                  setMessage('🎉 All letters found! CELO complete! You survived the temple!');
                }
                
                return newLetters;
              }
              return prev;
            });
          }
        }
      });

      state.renderer.render(state.scene, state.camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      state.camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && state.renderer) {
        containerRef.current.removeChild(state.renderer.domElement);
      }
      state.renderer?.dispose();
    };
  }, [gameOver]);

  const targetWord = 'CELO';

  const resetGame = () => {
    setFoundLetters([]);
    setHealth(100);
    setGameOver(false);
    setMessage('Explore the vast temple! Avoid the moving guards and spike traps!');
    window.location.reload();
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col">
      {/* Header UI */}
      <div className="bg-gray-800 p-3 text-white">
        <h1 className="text-2xl font-bold text-center text-green-400 mb-2">
          Temple Quest - Survive & Find CELO
        </h1>
        <div className="flex justify-between items-center mb-2 px-4">
          <div className="flex gap-2">
            {targetWord.split('').map((letter, idx) => (
              <div
                key={idx}
                className={`w-9 h-9 flex items-center justify-center border-2 rounded font-bold text-lg ${
                  foundLetters.includes(letter)
                    ? 'bg-green-500 border-green-600'
                    : 'bg-gray-600 border-gray-500'
                }`}
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-400">Health</div>
              <div className={`text-xl font-bold ${health > 50 ? 'text-green-400' : health > 25 ? 'text-yellow-400' : 'text-red-500'}`}>
                {health}%
              </div>
            </div>
            <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${health > 50 ? 'bg-green-500' : health > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-300 mb-1">
          {message}
        </p>
        <p className="text-center text-xs text-gray-400">
          WASD/Arrows: Move | Avoid red guards & spike traps | Follow the YELLOW BEAM to find letters!
        </p>
        <div className="text-center text-yellow-300 text-sm mt-1">
          📍 Current letter location: X: {currentLetterPos.x.toFixed(0)}, Z: {currentLetterPos.z.toFixed(0)}
        </div>
      </div>

      {/* 3D Canvas */}
      <div ref={containerRef} className="flex-1" />

      {/* Game Over / Victory Overlay */}
      {(gameOver || foundLetters.length === 4) && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md">
            {gameOver ? (
              <>
                <h2 className="text-4xl font-bold text-red-500 mb-4">💀 Game Over!</h2>
                <p className="text-white mb-2">You were defeated in the temple.</p>
                <p className="text-gray-400 mb-6">Letters found: {foundLetters.length}/4</p>
                <button
                  onClick={resetGame}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-yellow-400 mb-4">🎉 Victory!</h2>
                <p className="text-white mb-2">You found all letters and survived!</p>
                <p className="text-green-400 mb-6 text-2xl font-bold">CELO COMPLETE</p>
                <button
                  onClick={() => alert('Starting Section 1 Quest!')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg mb-3 transition-colors block w-full"
                >
                  Start Section 1 Quest →
                </button>
                <button
                  onClick={resetGame}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded-lg transition-colors block w-full"
                >
                  Play Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
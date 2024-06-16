// import { useRef, useState, useEffect } from 'react';
// import Mapback from '../components/HomePage/Mapback';
// import Markerbtn from '../components/HomePage/Markerbtn';
// import Backbtn from '../components/HomePage/Backbtn';
// import logo from '../assets/logo-128x128.png';
// import '../components/HomePage/homepage.css';
// import { CSSTransition } from 'react-transition-group';
// import Title from '../components/HomePage/Title';
// import ToMainApp from '../components/HomePage/ToMainApp';

// interface MarkerData {
//     lng: number;
//     lat: number;
//     object: React.ReactNode;
//     top: number;
//     left: number;
//     icon: string;
//     title: string;
//     small: boolean;
// }

// const dataMarker: MarkerData[] = [
//     {
//         lng: 4.37,
//         lat: 51.99,
//         object: <ToMainApp />,
//         top: 50,
//         left: 50,
//         icon: logo,
//         title: "Scandela",
//         small: false,
//     },
//     {
//         lng: 4.149,
//         lat: 52.018,
//         object: <ToMainApp />,
//         top: 40,
//         left: 35,
//         icon: logo,
//         title: "Tickets",
//         small: true,
//     },
// ];

// interface WIPPageProps {}

// const WIPPage: React.FC<WIPPageProps> = () => {
//     const [onSubMenu, setOnSubMenu] = useState(false);
//     const mapRef = useRef<mapboxgl.Map | null>(null);
//     const [toRender, setToRender] = useState<React.ReactNode | null>(null);

//     const handleButtonClick = (index: number) => {
//         if (onSubMenu) return;
//         setOnSubMenu(true);
//         setToRender(dataMarker[index].object);

//         // Fly to the marker location on the map
//         if (mapRef.current) {
//             mapRef.current.flyTo({
//                 center: [dataMarker[index].lng, dataMarker[index].lat],
//                 zoom: 14,
//                 essential: true,
//                 easing: (t) => t,
//             });
//         }
//     };

//     const handleBackClick = () => {
//         if (mapRef.current) {
//             mapRef.current.flyTo({
//                 center: [4.335, 51.985],
//                 zoom: 10,
//                 essential: true,
//                 easing: (t) => t,
//             });
//         }

//         setOnSubMenu(false);
//         setToRender(null);
//     };

//     return (
//         <div style={{ position: 'relative' }}>
//             <Mapback mapRef={mapRef} />
//             <Title />
//             <CSSTransition
//                 in={!onSubMenu}
//                 timeout={500}
//                 classNames="fade"
//                 unmountOnExit
//             >
//                 <div>
//                     {dataMarker.map((marker, index) => (
//                         <Markerbtn
//                             key={index}
//                             onClick={() => handleButtonClick(index)}
//                             icon={marker.icon}
//                             top={marker.top}
//                             left={marker.left}
//                             title={marker.title}
//                             small={marker.small}
//                         />
//                     ))}
//                 </div>
//             </CSSTransition>
//             <CSSTransition
//                 in={onSubMenu}
//                 timeout={500}
//                 classNames="fade"
//                 unmountOnExit
//             >
//                 <div
//                     style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                     }}
//                 >
//                     <Backbtn onClick={handleBackClick} />
//                     {toRender}
//                 </div>
//             </CSSTransition>
//         </div>
//     );
// };

// export default WIPPage;

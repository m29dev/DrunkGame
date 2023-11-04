// import { useSelector } from 'react-redux'
// import DiceDisplay from '../dice/DiceDisplay'
// import TextGradient from '../textGradient/TextGradient'
// import './navbar.css'
// import DiceRoll from '../dice/diceRoll'

// const Navbar = () => {
//     const { authInfo, roomInfo } = useSelector((state) => state.auth)

//     return (
//         <>
//             {/* navbar if game = true */}
//             {roomInfo?.game && (
//                 <div className="navbar">
//                     <div className="game-navbar">
//                         <h1>{authInfo?.userId}</h1>

//                         {/* Display rolled dice */}
//                         {roomInfo?.gameCurrentDice && (
//                             <DiceDisplay></DiceDisplay>
//                         )}
//                     </div>

//                     {roomInfo?.gameCurrentCategory && (
//                         <div className="category-navbar">
//                             <TextGradient
//                                 text={
//                                     roomInfo?.gameCurrentCategory ===
//                                     'challenge'
//                                         ? 'Challenge'
//                                         : roomInfo?.gameCurrentCategory ===
//                                           'qna'
//                                         ? 'Quizz'
//                                         : roomInfo?.gameCurrentCategory ===
//                                           'mostLikelyTo'
//                                         ? 'Most Likely To...'
//                                         : ''
//                                 }
//                                 size={40}
//                             ></TextGradient>
//                             <div className="paragraph">
//                                 <TextGradient
//                                     text={`CATEGORY`}
//                                     size={14}
//                                 ></TextGradient>
//                             </div>
//                         </div>
//                     )}

//                     {/* Roll the Dice */}
//                     {!roomInfo?.gameCurrentCategory &&
//                         !roomInfo?.gameCurrentDice && <DiceRoll></DiceRoll>}
//                 </div>
//             )}
//         </>
//     )
// }

// export default Navbar

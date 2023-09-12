import * as React from 'react'
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/** Props of the toastr component
 * @param {boolean} isDark - If the map is in dark mode or not
 */
interface ToastrProps {
  id : string;
  isDark: boolean;
}

const Toastr: React.FC<ToastrProps> = ({ id, isDark}) => {
  return (
    <div>
      <ToastContainer limit={2} />
    </div>
  );
};

/** 
 * How to use this Toastr component
 * 
 * 1. Import this : `import { showToast } from '../Toastr';`
 * 
 * 2. Call the `showToast` function wherever you want. For ex inside a onClick method
 * 
 *  Parameters :
 *    @param {string} type - success, error, warning, info, of blank
 *    @param {string} content - The message to display
 *    @param {string} position - OPTIONAL - Position of the toastr message
 *    @param {number} autoClose - OPTIONAL - Time before the toastr pop disapear
 *    @param {boolean} hideProgressBar - OPTIONAL - Is the progress bar hidden ?
 *    @param {boolean} closeOnClick - OPTIONAL - Is the toastr closing on click ?
 *    @param {boolean} pauseOnHover - OPTIONAL - Is the toastr pausing on hover ?
 *    @param {boolean} draggable - OPTIONAL - Is the toastr draggable ?
 */
export const showToast = (type: string, content: string, position?: ToastPosition, autoClose?: number,
  hideProgressBar?: boolean, closeOnClick?: boolean, pauseOnHover?: boolean, draggable?: boolean) => {
  switch (type) {
    case "success":
      toast.success(content, {position: position, autoClose: autoClose, hideProgressBar: hideProgressBar,
      closeOnClick: closeOnClick, pauseOnHover: pauseOnHover, draggable: draggable, theme: "colored"});
      break;
    case "error":
      toast.error(content, {position: position, autoClose: autoClose, hideProgressBar: hideProgressBar,
        closeOnClick: closeOnClick, pauseOnHover: pauseOnHover, draggable: draggable, theme: "colored"});
      break;
    case "warning":
      toast.warning(content, {position: position, autoClose: autoClose, hideProgressBar: hideProgressBar,
        closeOnClick: closeOnClick, pauseOnHover: pauseOnHover, draggable: draggable, theme: "colored"});
      break;
    case "info":
      toast.info(content, {position: position, autoClose: autoClose, hideProgressBar: hideProgressBar,
        closeOnClick: closeOnClick, pauseOnHover: pauseOnHover, draggable: draggable, theme: "colored"});
      break;
    default:
      toast(content, {position: position, autoClose: autoClose, hideProgressBar: hideProgressBar,
        closeOnClick: closeOnClick, pauseOnHover: pauseOnHover, draggable: draggable, theme: "dark"});
      break;
  };
};

export default Toastr;

/**
 *  INFO: Toastr can be spammed if the user spam the button creating them
 *  To prevent that, you can put a cooldown on the button.
 * 
 *    const [isOnCooldown, setIsOnCooldown] = React.useState(false); // in component init
 *    
 *    if (isOnCooldown) // start of button on click function
 *     return;
 *
 *    setIsOnCooldown(true);
 *    setTimeout(() => { setIsOnCooldown(false); }, 5000); // 5000 is the cooldown duration, put the autoClose value
 * 
 *    disabled={isOnCooldown} // in the button html
 */
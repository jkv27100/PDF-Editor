const minimum_size = 20;
let container_original_width = 0;
let container_original_height = 0;
let container_original_x = 0;
let container_original_y = 0;

let original_mouse_x = 0;
let original_mouse_y = 0;

/**
 * A function to make HTML element resizable
 * @param container A HTMLDIVElement acting as a container
 * @param resizers List of controllers which can be dragged for resizing
 * @param textInput A HTMLInputElement for text inputs
 * */

function makeResizableElement(
  container: HTMLDivElement,
  resizers: NodeListOf<HTMLDivElement>,
  textInput: HTMLInputElement,
  positionLeft: number,
  positionTop: number
) {
  resizers.forEach((resizer) => {
    resizer.addEventListener("mousedown", (e: MouseEvent) => {
      e.preventDefault();
      //Getting original width of container and textInput
      container_original_width = parseFloat(
        getComputedStyle(container, null)
          .getPropertyValue("width")
          .replace("px", "")
      );

      //Getting the original height of container and textInput
      container_original_height = parseFloat(
        getComputedStyle(container, null)
          .getPropertyValue("height")
          .replace("px", "")
      );

      container_original_x = container.getBoundingClientRect().left;
      container_original_y = container.getBoundingClientRect().top;

      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;

      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResize);
    });

    const resize = (e: MouseEvent) => {
      if (resizer.classList.contains("rightResizer")) {
        const containerWidth =
          container_original_width + (e.pageX - original_mouse_x);

        if (containerWidth > minimum_size) {
          container.style.width = containerWidth + "px";
          textInput.style.width = containerWidth - 20 + "px";
        }
      } else if (resizer.classList.contains("leftResizer")) {
        const containerWidth =
          container_original_width - (e.pageX - original_mouse_x);

        if (containerWidth > minimum_size) {
          container.style.width = containerWidth + "px";
          textInput.style.width = containerWidth - 20 + "px";

          container.style.left =
            container_original_x + (e.pageX - original_mouse_x) + "px";
        }
      } else if (resizer.classList.contains("topResizer")) {
        const height = container_original_height - (e.pageY - original_mouse_y);

        if (height > minimum_size) {
          container.style.height = height + "px";
          textInput.style.height = height - 20 + "px";

          container.style.top =
            container_original_y + (e.pageY - original_mouse_y) + "px";
        }
      } else if (resizer.classList.contains("bottomResizer")) {
        const height = container_original_height + (e.pageY - original_mouse_y);

        if (height > minimum_size) {
          container.style.height = height + "px";
          textInput.style.height = height - 20 + "px";
        }
      }
    };

    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
    };
  });
}

export default makeResizableElement;

import "./SignupStepsstyles.css"

const SignupSteps = (props) => {

      function decideIcons(page) {
            if (page === 1) {
                  const collection = document.getElementsByClassName("circle");
                  for (let i = 0; i < collection.length; i++) {
                        collection[i].style.backgroundColor = "gray";
                  }

                  const circle = document.querySelector('#circle1');
                  circle.style.backgroundColor = 'green';
                  

            } else if (page === 2) {
                  const collection = document.getElementsByClassName("circle");
                  for (let i = 0; i < collection.length; i++) {
                        collection[i].style.backgroundColor = "gray";
                  }

                  
                  const circle = document.querySelector('#circle2');
                  circle.style.backgroundColor = 'green';
                  

            } else {

            }

      }

      decideIcons(props.page)

      return (
            <div className="SignupSteps">
                  <span id="circle1" className="circle"></span>
                  <span id="circle2" className="circle"></span>
            </div>
      )
}

export default SignupSteps
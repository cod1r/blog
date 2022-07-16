/** @jsx h */

import { h } from "preact";

export default function SecondPost() {
  return (
    <div>
      9:12 pm 2/22/22
      <div>
        <div>
          <p>
            A little note as to why useEffect's do not properly update the state
            if you don't update state based on the current state. For example:
            <pre>
              <code>
                {`function Component() {
  let [lst, setLst] = useState([]);
  useEffect(() => {
   [1, 2, 3, 4, 5].map(n => setList([...lst, n]));
  }, []);
  return (
   <div>
    {lst.map(item =>
     <div key={"item: " + item}>
      {item}
     </div>
    )}
   </div>
  )
}`}
              </code>
            </pre>
          </p>
          <p>
            If you run this code, the only item that will be in the list is 5.
          </p>
          <p>
            The reason that the list has only 5, is because of closures. You are
            also probably thinking (or at least I was) that even if it was a
            closure, if we are calling setState (<i>setLst</i>), shouldn't the
            {" "}
            <i>lst</i> variable be updated since the <i>lst</i>{" "}
            was in a higher scope and we are updating and accessing that same
            variable?
          </p>
          <p>
            The reason is because everytime (not necessarily everytime because
            React might batch together setState calls for optimization reasons)
            you call setState (<i>setLst</i>), the component function,{" "}
            <i>Component</i>, gets rerendered and your component is recalled
            (something like{" "}
            <i>Component() or React.createElement(Component)</i>. I don't know
            the specifics). Once our component is rerendered, a new closure is
            created and so the useEffect function that you passed in previously,
            is referring to an old closure that holds an outdated version of
            {" "}
            <i>lst</i>. Which is why <i>lst</i>{" "}
            contains just 5 because in the old closure, <i>lst</i>{" "}
            is only equal to [] (an empty list).
          </p>
          <p>
            In order to fix this problem, we need to change{" "}
            <pre>
              <code>
                {`[1, 2, 3, 4, 5].map(n => setLst([...lst, n] ))`}
              </code>
            </pre>
            to{" "}
            <pre>
              <code>
                {`[1, 2, 3, 4, 5].map(n => setLst(currentLst => [...currentLst, n]))`}
              </code>
            </pre>
          </p>
          <p>
            So instead of referring to an old closures version of{" "}
            <i>lst</i>, we use the current state of <i>lst</i>{" "}
            (currentLst), to update our state which leads to a correct list that
            includes the numbers 1-5.
          </p>
        </div>
      </div>
    </div>
  );
}

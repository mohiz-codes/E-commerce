import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

function PriceSlider() {
  const [values, setValues] = useState([30, 100]);

  return (
    <div className="w-full px-2">
      <Range
        values={values}
        step={1}
        min={0}
        max={150}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="flex w-full h-8"
            style={{
              ...props.style,
            }}
          >
            <div
              ref={props.ref}
              className="w-full h-1 self-center rounded-full"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#E5E5E5", "#000000", "#E5E5E5"],
                  min: 0,
                  max: 150,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-5 w-5 rounded-full bg-black outline-none cursor-pointer"
          />
        )}
      />

      <div className="flex justify-between mt-4 text-sm">
        <span>${values[0]}</span>
        <span>${values[1]}</span>
      </div>
    </div>
  );
}

export default PriceSlider;
import { useState } from "react";

const inputVariants = [
  {
    inputType: "text",
    inputLabel: "Text Input",
    inputPlaceholder: "Text Input",
    sizeVariantType: "medium",
    inputStyleProp: {
      fontSize: "14px",
    },
    inputStyles: {
      sizeVariants: [
        {
          variantType: "large",
          variantLabel: "L",
          variantPlaceholder: "Large text",
          targetStyles: {
            fontSize: "16px",
            color: "red",
          },
        },
        {
          variantType: "medium",
          variantLabel: "M",
          variantPlaceholder: "Normal text",
          targetStyles: {
            fontSize: "14px",
            color: "blue",
          },
        },
        {
          variantType: "small",
          variantLabel: "S",
          variantPlaceholder: "Small text",
          targetStyles: {
            fontSize: "12px",
            color: "green",
          },
        },
      ],
    },
  },

  // repeat same as above for different input types
  // {
  //   inputType: "email",
  //   inputLabel: "Email Input",
  //   inputPlaceholder: "Email Input",
  //   inputStyles: {
  //     sizeVariants: [
  //       {
  //         sizeVariant: "l",
  //         variantPlaceholder: "Large text",
  //         fontSize: "16px",
  //         variantStyle: "",
  //       },
  //       {
  //         sizeVariant: "m",
  //         variantPlaceholder: "Normal text",
  //         fontSize: "14px",
  //       },
  //       {
  //         sizeVariant: "s",
  //         variantPlaceholder: "Small text",
  //         fontSize: "12px",
  //       },
  //     ],
  //   },
  // },

  // {
  //   inputType: "number",
  //   inputLabel: "Number Input",
  //   inputPlaceholder: "Number Input",
  //   inputStyles: {
  //     sizeVariants: [
  //       {
  //         sizeVariant: "l",
  //         variantPlaceholder: "Large text",
  //         fontSize: "16px",
  //       },
  //       {
  //         sizeVariant: "m",
  //         variantPlaceholder: "Normal text",
  //         fontSize: "14px",
  //       },
  //       {
  //         sizeVariant: "s",
  //         variantPlaceholder: "Small text",
  //         fontSize: "12px",
  //       },
  //     ],
  //   },
  // },
];

type InputElement = {
  inputType: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  hasInputPlaceholder?: boolean;
  [key: string]: any; // Allows additional dynamic properties
};

const FormBuilder = () => {
  const [selectedInputTypes, setSelectedInputTypes] = useState<InputElement[]>(
    []
  );

  const isInputTypeSelected = (targetInputType = ""): boolean => {
    return selectedInputTypes.some(
      (selectedInputType) => selectedInputType.inputType === targetInputType
    );
  };

  return (
    <div className="form-builder">
      <section className="panel left-panel config-panel">
        <h4 className="panel-title">Config Panel</h4>

        <section className="panel-body">
          <h5 className="form-element-title">Input variants</h5>

          <ul className="input-type-options">
            {inputVariants.map((inputVariant, index: number) => (
              <li
                key={index}
                className={`${inputVariant}_input-type-option input-type-option`}
              >
                <div className="input-type-selector">
                  <input
                    type="checkbox"
                    id={inputVariant.inputType}
                    name={inputVariant.inputType}
                    checked={isInputTypeSelected(inputVariant.inputType)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedInputTypes([
                          ...selectedInputTypes,
                          inputVariant,
                        ]);
                      } else {
                        const tempSelectedInputTypes = [
                          ...selectedInputTypes,
                        ].filter(
                          (selectedInputType) =>
                            selectedInputType.inputType !==
                            inputVariant.inputType
                        );

                        setSelectedInputTypes(tempSelectedInputTypes);
                      }
                    }}
                  />
                  <label htmlFor={inputVariant.inputLabel}>
                    {inputVariant.inputLabel}
                  </label>
                </div>

                <div className="input-type-styling-options">
                  {/* custom input label */}
                  <div className="input-type-styling-option">
                    <p className="styling-option-label">Label Text:</p>

                    <input
                      type="text"
                      value={
                        selectedInputTypes.some(
                          (selectedInputType) =>
                            selectedInputType.inputType ===
                            inputVariant.inputType
                        )
                          ? selectedInputTypes.find(
                              (selectedInputType) =>
                                selectedInputType.inputType ===
                                inputVariant.inputType
                            )?.inputLabel
                          : inputVariant.inputLabel
                      }
                      onChange={(e) => {
                        setSelectedInputTypes([
                          ...selectedInputTypes.map((selectedInputType) => {
                            if (
                              selectedInputType.inputType ===
                              inputVariant.inputType
                            ) {
                              return {
                                ...selectedInputType,
                                inputLabel: e.target.value,
                              };
                            }
                            return selectedInputType;
                          }),
                        ]);
                      }}
                    />
                  </div>

                  {/* custom input size */}
                  <div className="input-type-styling-option">
                    <p className="styling-option-label">Sizes:</p>

                    <ul className="size-options">
                      {inputVariant?.inputStyles?.sizeVariants.map(
                        (sizeVariant) => (
                          <li
                            className={`size-option ${
                              sizeVariant.variantType
                            }_variant ${
                              selectedInputTypes.find(
                                (selectedInputType) =>
                                  selectedInputType.inputType ===
                                    inputVariant.inputType &&
                                  selectedInputType.sizeVariantType ===
                                    sizeVariant.variantType
                              )
                                ? "is_selected_size"
                                : ""
                            }`}
                            onClick={() => {
                              // set selected size
                              let targetSelectedVariant =
                                selectedInputTypes.find(
                                  (selectedInputType) =>
                                    selectedInputType.inputType ===
                                    inputVariant.inputType
                                );

                              if (targetSelectedVariant) {
                                setSelectedInputTypes([
                                  ...selectedInputTypes.map(
                                    (selectedInputType) => {
                                      if (
                                        targetSelectedVariant.inputType ===
                                        selectedInputType.inputType
                                      ) {
                                        return {
                                          ...selectedInputType,
                                          sizeVariantType:
                                            sizeVariant.variantType,
                                          inputPlaceholder:
                                            sizeVariant.variantPlaceholder,
                                          inputStyleProp:
                                            sizeVariant.targetStyles,
                                        };
                                      }
                                      return selectedInputType;
                                    }
                                  ),
                                ]);
                              }
                            }}
                          >
                            {sizeVariant.variantLabel}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>

      <section className="panel right-panel preview-panel">
        <h4 className="panel-title">Preview Panel</h4>

        <section className="panel-body">
          <form
            className="custom-form-preview"
            action=""
            onSubmit={(e) => e.preventDefault()}
          >
            {selectedInputTypes.map((selectedInputType, index) => (
              <div key={index} className="form-group">
                <label htmlFor={selectedInputType.inputType}>
                  {selectedInputType.inputLabel || selectedInputType.inputType}
                </label>

                <input
                  style={selectedInputType.inputStyleProp}
                  key={index}
                  type={selectedInputType.inputType}
                  placeholder={`${
                    selectedInputType.inputPlaceholder ||
                    selectedInputType.inputType
                  }`}
                />
              </div>
            ))}
          </form>
        </section>
      </section>
    </div>
  );
};

export default FormBuilder;

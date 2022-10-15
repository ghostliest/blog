import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import cn from "classnames";
import { FieldUploadProps } from "./FieldUpload.props";
import styles from "./FieldUpload.module.scss";

export const FieldUpload = forwardRef(({ className }: FieldUploadProps, ref) => {
  const [value, setValue] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState<boolean | undefined>(undefined);

  const inputRef = useRef({}) as any;

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (value: File) => setValue(value),
    check: () => isComplete,
    clear: () => {
      setValue(null);
      setIsComplete(undefined);
    },
  }));

  useEffect(() => {
    if (value?.size) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [value]);

  const handleOpenFileDialog = () => {
    inputRef?.current?.click();
  };

  const handleChange = (file: File) => {
    if (file) setValue(file);
    else return;
  };

  return (
    <div
      onClick={handleOpenFileDialog}
      className={cn(styles.inputContainer, className, {
        [styles.inputContainerWithImg]: value,
      })}
    >
      <div
        className={cn(styles.infoContainer, {
          [styles.infoContainerWithImg]: value,
          [styles.infoContainerWithoutImg]: !value,
        })}
      >
        <div className={styles.info}>
          <span>{value ? "Click to change" : "Click to upload"}</span>
        </div>
      </div>
      <div className="hidden">
        <input type="file" multiple={false} ref={inputRef} onChange={(e) => handleChange(e!.target!.files![0])} />
      </div>
      {value && (
        <div className={styles.imgUploadContainer}>
          <img className={styles.imgUpload} src={URL?.createObjectURL(value)} alt="poster" />
        </div>
      )}
    </div>
  );
});

FieldUpload.displayName = "FieldUpload";

import os

def extract_text_from_folder(input_paths, output_file, files_to_skip=None, folders_to_skip=None):
    """
    Extracts text from all files within specified folders and also from individual files provided as input.
    """

    if not isinstance(input_paths, list):
        input_paths = [input_paths]  # Treat as a single path if not a list

    if files_to_skip is None:
        files_to_skip = []
    if folders_to_skip is None:
        folders_to_skip = []

    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_file_path = os.path.join(script_dir, output_file)

    with open(output_file_path, 'w', encoding='utf-8') as outfile:
        for input_path in input_paths:
            if os.path.isfile(input_path):
                # Process as a single file
                if os.path.basename(input_path) in files_to_skip:
                    print(f"Skipping specified file: {os.path.basename(input_path)}")
                    continue
                try:
                    with open(input_path, 'r', encoding='utf-8') as f:
                        text = f.read()
                    outfile.write(f"--- File: {input_path} ---\n\n")
                    outfile.write(text)
                    outfile.write("\n\n")
                except UnicodeDecodeError:
                    print(f"Skipping binary file: {input_path}")
                except Exception as e:
                    print(f"Error processing {input_path}: {e}")

            elif os.path.isdir(input_path):
                # Process as a folder
                print(f"Processing folder: {input_path}")
                for foldername, subfolders, filenames in os.walk(input_path):
                    # Check if folder to skip is in the current folder path
                    should_skip_folder = any(folder in foldername for folder in folders_to_skip)

                    if should_skip_folder:
                        print(f"Skipping specified folder: {foldername}")
                        continue

                    for filename in filenames:
                        if filename in files_to_skip:
                            print(f"Skipping specified file: {filename}")
                            continue

                        file_path = os.path.join(foldername, filename)

                        try:
                            with open(file_path, 'r', encoding='utf-8') as f:
                                text = f.read()
                            outfile.write(f"--- File: {file_path} ---\n\n")
                            outfile.write(text)
                            outfile.write("\n\n")
                        except UnicodeDecodeError:
                            print(f"Skipping binary file: {file_path}")
                        except Exception as e:
                            print(f"Error processing {file_path}: {e}")
            else:
                print(f"Warning: Input path '{input_path}' is not a valid file or directory. Skipping.")

if __name__ == "__main__":
    folders_and_files_to_extract = [
       "/home/sk/Desktop/Slot_Booking Application/src",

        
    ]
    output_text_file = "extracted_text.txt"
    files_to_skip = [

        "next.config.ts", 
        # "next.config.mjs",
          "tailwind.config.ts", "tsconfig.json","postcss.config.mjs","next-env.d.ts","components.json",".eslintrc.json","EDA.ipynb","evaluate.ipynb","textScript.py","stock_price.csv","globals.css","auto_complete.json", "another_file.css", "LogoBadge.svelte","README.md",".gitignore","package-lock.json","package.json"]
    folders_to_skip = [
        # "chat",
        # "auth",
        # "socket",
        # "[id]",
        # "components",
        "fonts","venv",".pytest_cache", ".next","results","notebooks","data","env","__pycache__","resetpassword","register","assets","icon", "asset", "node_modules",".git"]

    extract_text_from_folder(folders_and_files_to_extract, output_text_file, files_to_skip, folders_to_skip)
    print(f"Text extraction complete. Output saved to: {output_text_file}")



        
// Utils/IconImporter.js
import * as FontAwesome from "@fortawesome/free-solid-svg-icons";
import * as FontAwesomeBrands from "@fortawesome/free-brands-svg-icons";
// Add other icon libraries if needed

// Icon library mapping
const iconLibraries = {
  fa: FontAwesome,
  fab: FontAwesomeBrands,
  // Add other libraries here, e.g., Material Icons
};

/**
 * Dynamically imports an icon from the specified library.
 * @param {string} libraryKey - The library key (e.g., "fa", "fab").
 * @param {string} iconName - The name of the icon (e.g., "Truck", "Facebook").
 * @returns {object} - The icon object if found, or null if not.
 */
export const getIcon = (libraryKey, iconName) => {
  const library = iconLibraries[libraryKey];
  if (!library) {
    console.error(`Icon library "${libraryKey}" not found.`);
    return null;
  }

  const icon = library[`fa${iconName}`];
  if (!icon) {
    console.error(`Icon "${iconName}" not found in library "${libraryKey}".`);
    return null;
  }

  return icon;
};

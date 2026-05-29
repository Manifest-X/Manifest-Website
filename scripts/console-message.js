/**
 * Console greeting — runs once per page load. A small invitation to anyone
 * curious enough to open DevTools, pointing them at the GitHub project so
 * they can star, contribute, or file ideas.
 */
(function () {
  if (typeof console === 'undefined') return;

  // Standard figlet font. Single-quoted lines + array.join sidesteps the
  // backtick-and-backslash escaping mess of a multi-line template literal.
  var ascii = [
    '',
    ' __  __             _  __           _   ',
    '|  \\/  | __ _ _ __ (_)/ _| ___  ___| |_ ',
    "| |\\/| |/ _` | '_ \\| | |_ / _ \\/ __| __|",
    '| |  | | (_| | | | | |  _|  __/\\__ \\ |_ ',
    '|_|  |_|\\__,_|_| |_|_|_|  \\___||___/\\__|',
    '',
  ].join('\n');

  var brand = 'color: #f19b46; font-weight: bold;';
  var heading = 'font-size: 16px; font-weight: bold;';
  var muted = 'color: #888;';

  console.log('%c' + ascii, brand);
  console.log('%cLike what you see?', heading);
  console.log('%cManifest is open-source. Star it, contribute, or open issues to help shape what comes next.', muted);
  console.log('https://github.com/Manifest-X/Manifest');
})();

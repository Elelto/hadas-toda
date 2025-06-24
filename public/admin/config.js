// הגדרות מתקדמות ל-Decap CMS
window.CMS_MANUAL_INIT = true;

// הגדרת התצורה של ה-CMS
window.initCMS = function() {
  CMS.init({
    config: {
      // הגדרות בסיסיות
      backend: {
        name: 'git-gateway',
        branch: 'main',
      },
      // הגדרת בדיקה מקומית ללא צורך בהתחברות
      local_backend: true,
      
      // הגדרות מדיה
      media_folder: "public/images/uploads",
      public_folder: "/images/uploads",
      
      // הגדרת שפה
      locale: 'he',
      
      // הגדרות עורך
      slug: {
        encoding: "ascii",
        clean_accents: true,
      },
      
      // אוספים
      collections: [
        {
          name: "blog",
          label: "פוסטים בבלוג",
          folder: "src/content/blog",
          create: true,
          slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
          fields: [
            { label: "כותרת", name: "title", widget: "string" },
            { label: "תאריך פרסום", name: "date", widget: "datetime" },
            { label: "תקציר", name: "excerpt", widget: "text" },
            { label: "תמונת נושא", name: "image", widget: "image" },
            { label: "קטגוריות", name: "categories", widget: "list", required: false },
            { label: "תוכן הפוסט", name: "body", widget: "markdown" }
          ]
        }
      ]
    },
    // הגדרות נוספות
    // התאמות לעברית
    locales: {
      'he': {
        'app': {
          'header': {
            'content': 'תוכן',
            'workflow': 'תהליך עבודה',
            'media': 'מדיה',
            'quickAdd': 'הוספה מהירה',
          },
          'app': {
            'errorHeader': 'שגיאה בטעינת תצורת ה-CMS',
            'configErrors': 'שגיאות תצורה',
            'checkConfigYml': 'בדוק את קובץ config.yml שלך.',
            'loadingConfig': 'טוען תצורה...',
            'waitingBackend': 'ממתין לשרת...',
          },
          'collection': {
            'sidebar': {
              'collections': 'אוספים',
              'searchAll': 'חפש בכל',
            },
            'collectionTop': {
              'viewAs': 'צפה כ',
              'newButton': 'חדש %{collectionLabel}',
            },
            'entries': {
              'loadingEntries': 'טוען רשומות...',
              'cachingEntries': 'מטמין רשומות...',
              'backCollection': 'כתיבה בחזרה לאוסף %{collectionLabel}',
              'newButton': 'חדש %{collectionLabel}',
            },
          },
          'editor': {
            'editorControl': {
              'field': {
                'optional': 'אופציונלי',
              },
            },
            'editorControlPane': {
              'widget': {
                'required': '%{fieldLabel} נדרש.',
                'regexPattern': '%{fieldLabel} לא תואם לתבנית: %{pattern}.',
                'processing': '%{fieldLabel} מעבד.',
                'range': '%{fieldLabel} חייב להיות בין %{minValue} ל %{maxValue}.',
                'min': '%{fieldLabel} חייב להיות לפחות %{minValue}.',
                'max': '%{fieldLabel} חייב להיות %{maxValue} או פחות.',
              },
            },
            'editor': {
              'onLeavePage': 'האם אתה בטוח שברצונך לעזוב את הדף?',
              'onUpdatingWithUnsavedChanges': 'יש לך שינויים שלא נשמרו, אנא שמור אותם לפני עדכון הסטטוס.',
              'onPublishingNotReady': 'אנא שנה את הסטטוס ל"מוכן" לפני פרסום.',
              'onPublishingWithUnsavedChanges': 'יש לך שינויים שלא נשמרו, אנא שמור אותם לפני פרסום.',
              'onPublishing': 'האם אתה בטוח שברצונך לפרסם רשומה זו?',
              'onDeleteWithUnsavedChanges': 'האם אתה בטוח שברצונך למחוק רשומה זו, יחד עם כל השינויים שלא נשמרו מהסשן הנוכחי?',
              'onDeletePublishedEntry': 'האם אתה בטוח שברצונך למחוק רשומה מפורסמת זו?',
              'onDeleteUnpublishedChangesWithUnsavedChanges': 'פעולה זו תמחק את כל השינויים שלא פורסמו לרשומה זו, וכן את כל השינויים שלא נשמרו מהסשן הנוכחי. האם אתה עדיין רוצה למחוק?',
              'onDeleteUnpublishedChanges': 'כל השינויים שלא פורסמו לרשומה זו יימחקו. האם אתה עדיין רוצה למחוק?',
              'loadingEntry': 'טוען רשומה...',
            },
          },
          'mediaLibrary': {
            'mediaLibraryCard': {
              'draft': 'טיוטה',
            },
            'mediaLibrary': {
              'onDeleteBody': 'האם אתה בטוח שברצונך למחוק את קובץ המדיה הנבחר?',
              'fileTooLarge': 'הקובץ גדול מדי.\nמוגדר לא לאפשר קבצים גדולים מ-%{size} kB.',
            },
            'mediaLibraryModal': {
              'loading': 'טוען...',
              'noResults': 'אין תוצאות.',
              'noAssetsFound': 'לא נמצאו נכסים.',
              'noImagesFound': 'לא נמצאו תמונות.',
              'private': 'פרטי ',
              'images': 'תמונות',
              'mediaAssets': 'נכסי מדיה',
              'search': 'חיפוש...',
              'uploading': 'מעלה...',
              'upload': 'העלאה חדשה',
              'deleting': 'מוחק...',
              'deleteSelected': 'מחק נבחרים',
              'chooseSelected': 'בחר נבחרים',
            },
          },
          'ui': {
            'errorBoundary': {
              'title': 'שגיאה',
              'details': 'אירעה שגיאה - אנא ',
              'reportIt': 'דווח עליה.',
              'detailsHeading': 'פרטים',
              'recoveredEntry': {
                'heading': 'מסמך שהתאושש',
                'warning': 'אנא העתק/הדבק את זה למקום כלשהו לפני שאתה עוזב!',
                'copyButtonLabel': 'העתק ללוח',
              },
            },
            'settingsDropdown': {
              'logOut': 'התנתק',
            },
            'toast': {
              'onFailToLoadEntries': 'נכשל בטעינת רשומה: %{details}',
              'onFailToLoadDeployPreview': 'נכשל בטעינת תצוגה מקדימה: %{details}',
              'onFailToPersist': 'נכשל בשמירת רשומה: %{details}',
              'onFailToDelete': 'נכשל במחיקת רשומה: %{details}',
              'onFailToUpdateStatus': 'נכשל בעדכון סטטוס: %{details}',
              'missingRequiredField': 'אופס, פספסת שדה נדרש. אנא מלא אותו לפני השמירה.',
              'entrySaved': 'רשומה נשמרה',
              'entryPublished': 'רשומה פורסמה',
              'entryUnpublished': 'רשומה בוטלה מפרסום',
              'onFailToPublishEntry': 'נכשל בפרסום רשומה: %{details}',
              'onFailToUnpublishEntry': 'נכשל בביטול פרסום רשומה: %{details}',
              'entryUpdated': 'סטטוס רשומה עודכן',
              'onDeleteUnpublishedChanges': 'שינויים שלא פורסמו נמחקו',
              'onFailToAuth': '%{details}',
            },
          },
        },
      },
    },
  });
};

// אתחול ה-CMS
window.addEventListener('load', function() {
  window.initCMS();
});

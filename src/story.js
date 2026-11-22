// Canonical Egyptian Arabic script and ordered story cues.
export const scenes = [
  {
    "id": "scene_01_intro",
    "chapter": 1,
    "place": "dawn",
    "steps": [
      {
        "speaker": "",
        "text": "كان يوم عادي جدًا..."
      },
      {
        "speaker": "",
        "text": "بس لما بيكون فيه حد مميز..."
      },
      {
        "speaker": "",
        "text": "حتى أبسط التفاصيل بتبقى حكاية."
      },
      {
        "speaker": "",
        "text": "ودي حكاية يومنا سوا."
      }
    ]
  },
  {
    "id": "scene_02_meeting",
    "chapter": 1,
    "place": "street",
    "steps": [
      {
        "speaker": "Anas",
        "text": "أخيرًااا! أنا مستنيكي من بدري على فكرة."
      },
      {
        "speaker": "Sama",
        "text": "يا سلام؟ هو أنا اتأخرت أوي كده؟"
      },
      {
        "speaker": "Anas",
        "text": "لا خالص... ده أنا بس عديت كل بلاط الشارع من كتر الانتظار."
      },
      {
        "speaker": "Sama",
        "text": "ههههه طب معلش يا سيدي."
      },
      {
        "speaker": "Anas",
        "text": "طب استني... قبل ما نبدأ يومنا."
      },
      {
        "speaker": "Anas",
        "text": "هتسلمي عليا إزاي؟"
      },
      {
        "id": "scene_02_meeting_1",
        "options": [
          {
            "id": "scene_02_meeting_1_A",
            "label": "أجري عليه وأحضنه ♡",
            "motion": "hug",
            "lines": [
              {
                "speaker": "Anas",
                "text": "إيه الجمال ده كله؟ كده اليوم بدأ صح."
              },
              {
                "speaker": "Sama",
                "text": "وحشتني يا أنس."
              },
              {
                "speaker": "Anas",
                "text": "وإنتِ وحشتيني أكتر."
              }
            ]
          },
          {
            "id": "scene_02_meeting_1_B",
            "label": "أقربله وأبتسم بخجل",
            "motion": "shy",
            "lines": [
              {
                "speaker": "Anas",
                "text": "إيه الضحكة الحلوة دي؟"
              },
              {
                "speaker": "Sama",
                "text": "مفيش..."
              },
              {
                "speaker": "Anas",
                "text": "طب خليها موجودة طول اليوم."
              }
            ]
          },
          {
            "id": "scene_02_meeting_1_C",
            "label": "أهزر معاه وأعمل نفسي مش شايفاه",
            "motion": "prank",
            "lines": [
              {
                "speaker": "Anas",
                "text": "إيه ده؟ أنا بقيت هوا؟"
              },
              {
                "speaker": "Sama",
                "text": "ههههه بهزر معاك."
              },
              {
                "speaker": "Anas",
                "text": "ماشي يا ستي... هفتكرلك دي."
              }
            ]
          }
        ],
        "prompt": "تعملي إيه أول ما تشوفي أنس؟"
      },
      {
        "speaker": "Anas",
        "text": "جاهزة لأحلى يوم؟"
      },
      {
        "speaker": "Sama",
        "text": "جاهزة."
      },
      {
        "speaker": "Anas",
        "text": "يبقى يلا بينا."
      }
    ]
  },
  {
    "id": "scene_03_street_walk",
    "chapter": 1,
    "place": "street",
    "steps": [
      {
        "speaker": "Sama",
        "text": "هو إحنا رايحين فين أصلًا؟"
      },
      {
        "speaker": "Anas",
        "text": "لو قولتلك تبقى مفاجأة إزاي؟"
      },
      {
        "speaker": "Sama",
        "text": "طب اديني تلميح."
      },
      {
        "speaker": "Anas",
        "text": "المكان حلو... بس مش أحلى منك."
      },
      {
        "speaker": "Sama",
        "text": "يا عم بطل كلامك ده."
      },
      {
        "speaker": "Anas",
        "text": "يعني مكمّلش؟"
      },
      {
        "speaker": "Sama",
        "text": "لا... كمّل."
      },
      {
        "id": "scene_03_street_walk_1",
        "options": [
          {
            "id": "scene_03_street_walk_1_A",
            "label": "أمسك إيده ♡",
            "motion": "walkHands",
            "lines": [
              {
                "speaker": "Anas",
                "text": "كده المشوار بقى أحلى بكتير."
              },
              {
                "speaker": "Sama",
                "text": "إحنا لسه في أوله."
              }
            ]
          },
          {
            "id": "scene_03_street_walk_1_B",
            "label": "أمشي جنبه وأبصله",
            "motion": "glance",
            "lines": [
              {
                "speaker": "Anas",
                "text": "بتبصيلي كده ليه؟"
              },
              {
                "speaker": "Sama",
                "text": "عادي."
              },
              {
                "speaker": "Anas",
                "text": "طب بصي براحتك."
              }
            ]
          },
          {
            "id": "scene_03_street_walk_1_C",
            "label": "أجري قدامه وأستناه",
            "motion": "race",
            "lines": [
              {
                "speaker": "Anas",
                "text": "استنييي، هو إحنا بنتسابق؟"
              },
              {
                "speaker": "Sama",
                "text": "يلا وريني هتلحقني ولا لأ."
              }
            ]
          }
        ],
        "prompt": "نكمّل المشي إزاي؟"
      },
      {
        "speaker": "Anas",
        "text": "على فكرة أنا مبسوط إننا ماشيين سوا كده."
      },
      {
        "speaker": "Sama",
        "text": "وأنا كمان."
      }
    ]
  },
  {
    "id": "scene_04_street_memory",
    "chapter": 1,
    "place": "street",
    "steps": [
      {
        "speaker": "Anas",
        "text": "استني هنا ثانية."
      },
      {
        "speaker": "Sama",
        "text": "ليه؟"
      },
      {
        "speaker": "Anas",
        "text": "عشان اليوم ده لازم نفتكره."
      },
      {
        "speaker": "Sama",
        "text": "ونفتكره إزاي بقى؟"
      },
      {
        "speaker": "Anas",
        "text": "إنتِ اختاري."
      },
      {
        "id": "scene_04_street_memory_1",
        "options": [
          {
            "id": "scene_04_street_memory_1_A",
            "label": "ناخد سيلفي سوا 📸",
            "motion": "selfie",
            "lines": [
              {
                "speaker": "Anas",
                "text": "دي أحلى صورة في الموبايل."
              },
              {
                "speaker": "Sama",
                "text": "وريني كده!"
              },
              {
                "speaker": "Anas",
                "text": "استني، هخليها خلفية."
              }
            ]
          },
          {
            "id": "scene_04_street_memory_1_B",
            "label": "أديله قلب صغير ♡",
            "motion": "sendHeart",
            "lines": [
              {
                "speaker": "Anas",
                "text": "ده ليا أنا؟"
              },
              {
                "speaker": "Sama",
                "text": "آه، بس خليه معاك."
              },
              {
                "speaker": "Anas",
                "text": "ده مكانه عندي خلاص."
              }
            ]
          },
          {
            "id": "scene_04_street_memory_1_C",
            "label": "نقف ونضحك سوا",
            "motion": "laugh",
            "lines": [
              {
                "speaker": "Anas",
                "text": "إنتِ عارفة إن ضحكتك بتضحكني؟"
              },
              {
                "speaker": "Sama",
                "text": "وأنت أصلًا بتضحك على أي حاجة."
              },
              {
                "speaker": "Anas",
                "text": "خصوصًا وأنا معاكي."
              }
            ]
          }
        ],
        "prompt": "نعمل ذكرى إيه؟"
      },
      {
        "speaker": "Sama",
        "text": "طب والمفاجأة اللي قولتلي عليها؟"
      },
      {
        "speaker": "Anas",
        "text": "قربنا نوصل."
      }
    ]
  },
  {
    "id": "scene_05_cafe_arrival",
    "chapter": 2,
    "place": "cafeOut",
    "steps": [
      {
        "speaker": "Anas",
        "text": "وصلنااا."
      },
      {
        "speaker": "Sama",
        "text": "كافيه؟"
      },
      {
        "speaker": "Anas",
        "text": "أيوه، بس اختارتلك مكان كيوت."
      },
      {
        "speaker": "Sama",
        "text": "ده حلو أوي!"
      },
      {
        "speaker": "Anas",
        "text": "طب يلا ندخل."
      },
      {
        "motion": "cafeDoor"
      },
      {
        "speaker": "Anas",
        "text": "تحبي نقعد عند الشباك؟"
      },
      {
        "speaker": "Sama",
        "text": "آه، المكان هناك حلو."
      },
      {
        "motion": "cafeSit"
      },
      {
        "speaker": "Anas",
        "text": "كده بقى نبدأ الديت رسمي."
      },
      {
        "speaker": "Sama",
        "text": "ههههه ماشي يا سيدي."
      }
    ]
  },
  {
    "id": "scene_06_cafe_talk",
    "chapter": 2,
    "place": "cafe",
    "steps": [
      {
        "speaker": "Anas",
        "text": "قوليلي بقى... اليوم عاجبك لحد دلوقتي؟"
      },
      {
        "speaker": "Sama",
        "text": "آه جدًا."
      },
      {
        "speaker": "Anas",
        "text": "لسه فيه حاجات كتير."
      },
      {
        "speaker": "Sama",
        "text": "إنت محضر كل ده؟"
      },
      {
        "speaker": "Anas",
        "text": "طبعًا، هو أنا كل يوم بقضي يوم كامل معاكي؟"
      },
      {
        "speaker": "Sama",
        "text": "طب إيه أكتر حاجة مستنيها؟"
      },
      {
        "speaker": "Anas",
        "text": "كل حاجة وإنتِ موجودة فيها."
      },
      {
        "id": "scene_06_cafe_talk_1",
        "options": [
          {
            "id": "scene_06_cafe_talk_1_A",
            "label": "أبصله في عينيه وأبتسم",
            "motion": "eyeContact",
            "lines": [
              {
                "speaker": "Sama",
                "text": "إنت بتعرف تخليني أبتسم بسهولة."
              },
              {
                "speaker": "Anas",
                "text": "وأنا عايز أفضل أشوف الضحكة دي."
              }
            ]
          },
          {
            "id": "scene_06_cafe_talk_1_B",
            "label": "أضحك وأقوله يا رخم",
            "motion": "tease",
            "lines": [
              {
                "speaker": "Sama",
                "text": "ههههه يا رخم."
              },
              {
                "speaker": "Anas",
                "text": "طب والله رخم بس بحب أشوفك مبسوطة."
              }
            ]
          },
          {
            "id": "scene_06_cafe_talk_1_C",
            "label": "أتكسف وأبص في الكوباية",
            "motion": "cup",
            "lines": [
              {
                "speaker": "Anas",
                "text": "اتكسفتي؟"
              },
              {
                "speaker": "Sama",
                "text": "لا!"
              },
              {
                "speaker": "Anas",
                "text": "آه طبعًا، واضح جدًا."
              }
            ]
          }
        ],
        "prompt": "تردّي عليه إزاي؟"
      },
      {
        "speaker": "Sama",
        "text": "طب وإحنا هنعمل إيه بعد كده؟"
      },
      {
        "speaker": "Anas",
        "text": "استني بس، لسه عندي حاجة صغيرة."
      }
    ]
  },
  {
    "id": "scene_07_flower",
    "chapter": 2,
    "place": "cafe",
    "steps": [
      {
        "speaker": "Anas",
        "text": "سما..."
      },
      {
        "speaker": "Sama",
        "text": "نعم؟"
      },
      {
        "speaker": "Anas",
        "text": "دي ليكي."
      },
      {
        "speaker": "Sama",
        "text": "إيه ده؟ وردة؟"
      },
      {
        "speaker": "Anas",
        "text": "آه، شوفتها وافتكرتك."
      },
      {
        "speaker": "Sama",
        "text": "ليه يعني؟"
      },
      {
        "speaker": "Anas",
        "text": "عشان حلوة وهادية كده."
      },
      {
        "id": "scene_07_flower_1",
        "options": [
          {
            "id": "scene_07_flower_1_A",
            "label": "أخدها وأبتسم 🌸",
            "motion": "flower",
            "lines": [
              {
                "speaker": "Sama",
                "text": "ميرسي يا أنس، حلوة أوي."
              },
              {
                "speaker": "Anas",
                "text": "هي حلوة عشان بقت معاكي."
              }
            ]
          },
          {
            "id": "scene_07_flower_1_B",
            "label": "أحضنه ♡",
            "motion": "flowerHug",
            "lines": [
              {
                "speaker": "Sama",
                "text": "إنت كيوت أوي."
              },
              {
                "speaker": "Anas",
                "text": "ده أحلى رد فعل كنت ممكن أخده."
              }
            ]
          },
          {
            "id": "scene_07_flower_1_C",
            "label": "أهزر وأقوله دي بس؟",
            "motion": "flowerTease",
            "lines": [
              {
                "speaker": "Sama",
                "text": "دي بس؟"
              },
              {
                "speaker": "Anas",
                "text": "يا نهار أبيض! طب استني أشوف محل الورد كله."
              },
              {
                "speaker": "Sama",
                "text": "ههههه بهزر معاك."
              },
              {
                "speaker": "Anas",
                "text": "عارف يا ستي."
              }
            ]
          }
        ],
        "prompt": "هتعملي إيه بالوردة؟"
      },
      {
        "speaker": "Anas",
        "text": "خليها معاكي بقى."
      },
      {
        "speaker": "Sama",
        "text": "هحتفظ بيها."
      },
      {
        "speaker": "Anas",
        "text": "طب جاهزة نكمل اليوم؟"
      },
      {
        "speaker": "Sama",
        "text": "يلا."
      }
    ]
  },
  {
    "id": "scene_08_leave_cafe",
    "chapter": 2,
    "place": "cafeOut",
    "steps": [
      {
        "speaker": "Sama",
        "text": "الكافيه كان حلو أوي."
      },
      {
        "speaker": "Anas",
        "text": "مبسوط إنه عجبك."
      },
      {
        "speaker": "Sama",
        "text": "بس أنا لسه مش عارفة إحنا رايحين فين."
      },
      {
        "speaker": "Anas",
        "text": "المرة دي هديكي تلميح بجد."
      },
      {
        "speaker": "Sama",
        "text": "قول."
      },
      {
        "speaker": "Anas",
        "text": "مكان فيه هوا حلو... وصوت مريح... ومنظره ميتملش."
      },
      {
        "speaker": "Sama",
        "text": "البحر؟!"
      },
      {
        "speaker": "Anas",
        "text": "عرفتيها بسرعة أوي!"
      },
      {
        "speaker": "Sama",
        "text": "يلاااا!"
      },
      {
        "id": "scene_08_leave_cafe_1",
        "options": [
          {
            "id": "scene_08_leave_cafe_1_A",
            "label": "نمشي ماسكين إيد بعض",
            "motion": "walkHands",
            "lines": [
              {
                "speaker": "Anas",
                "text": "أهو كده الطريق هيبقى حلو."
              }
            ]
          },
          {
            "id": "scene_08_leave_cafe_1_B",
            "label": "نجري شوية من الحماس",
            "motion": "jog",
            "lines": [
              {
                "speaker": "Anas",
                "text": "استني يا بنتي، البحر مش هيطير!"
              },
              {
                "speaker": "Sama",
                "text": "ههههه يلا بسرعة."
              }
            ]
          }
        ],
        "prompt": "نروح البحر إزاي؟"
      }
    ]
  },
  {
    "id": "scene_09_beach_arrival",
    "chapter": 3,
    "place": "sea",
    "steps": [
      {
        "speaker": "Sama",
        "text": "واااو... البحر!"
      },
      {
        "speaker": "Anas",
        "text": "كنت عارف إنه هيعجبك."
      },
      {
        "speaker": "Sama",
        "text": "المنظر حلو أوي."
      },
      {
        "speaker": "Anas",
        "text": "طب استني لما الشمس تبدأ تغرب."
      },
      {
        "speaker": "Sama",
        "text": "هنفضل هنا للغروب؟"
      },
      {
        "speaker": "Anas",
        "text": "آه، عايز أوريكي حاجة حلوة."
      },
      {
        "motion": "breeze"
      },
      {
        "speaker": "Sama",
        "text": "الجو هنا مريح أوي."
      },
      {
        "speaker": "Anas",
        "text": "خصوصًا وإحنا سوا."
      }
    ]
  },
  {
    "id": "scene_10_beach_walk",
    "chapter": 3,
    "place": "sea",
    "steps": [
      {
        "speaker": "Anas",
        "text": "عارفة أنا بحب إيه في البحر؟"
      },
      {
        "speaker": "Sama",
        "text": "إيه؟"
      },
      {
        "speaker": "Anas",
        "text": "إن الواحد بيقدر ينسى دوشة الدنيا شوية."
      },
      {
        "speaker": "Sama",
        "text": "صح."
      },
      {
        "speaker": "Anas",
        "text": "بس النهارده أحلى حاجة مش البحر."
      },
      {
        "speaker": "Sama",
        "text": "أومال إيه؟"
      },
      {
        "speaker": "Anas",
        "text": "إنك هنا."
      },
      {
        "id": "scene_10_beach_walk_1",
        "options": [
          {
            "id": "scene_10_beach_walk_1_A",
            "label": "أمسك إيده ونكمل المشي ♡",
            "motion": "walkHands",
            "lines": [
              {
                "speaker": "Sama",
                "text": "طب يلا نتمشى شوية كمان."
              },
              {
                "speaker": "Anas",
                "text": "يلا، أنا مش مستعجل."
              }
            ]
          },
          {
            "id": "scene_10_beach_walk_1_B",
            "label": "أجري قدامه وأستناه",
            "motion": "race",
            "lines": [
              {
                "speaker": "Anas",
                "text": "إيه النشاط ده كله؟"
              },
              {
                "speaker": "Sama",
                "text": "ههههه الحقني بقى."
              },
              {
                "speaker": "Anas",
                "text": "جايلك أهو."
              }
            ]
          },
          {
            "id": "scene_10_beach_walk_1_C",
            "label": "نقف نتفرج على البحر",
            "motion": "watch",
            "lines": [
              {
                "speaker": "Sama",
                "text": "بحب المنظر ده."
              },
              {
                "speaker": "Anas",
                "text": "وأنا مبسوط إني بشوفه معاكي."
              }
            ]
          }
        ],
        "prompt": "نقضي اللحظة دي إزاي؟"
      },
      {
        "speaker": "Sama",
        "text": "الشمس بدأت تنزل."
      },
      {
        "speaker": "Anas",
        "text": "تعالي نقعد في مكان أحلى."
      }
    ]
  },
  {
    "id": "scene_11_sunset",
    "chapter": 3,
    "place": "sunset",
    "steps": [
      {
        "speaker": "Sama",
        "text": "ياااه... الغروب تحفة."
      },
      {
        "speaker": "Anas",
        "text": "كنت مستني اللحظة دي."
      },
      {
        "speaker": "Sama",
        "text": "ليه؟"
      },
      {
        "speaker": "Anas",
        "text": "عشان كنت عايز نقف هنا سوا."
      },
      {
        "speaker": "Sama",
        "text": "أنا مبسوطة أوي النهارده."
      },
      {
        "speaker": "Anas",
        "text": "وأنا كمان... أكتر مما تتخيلي."
      },
      {
        "speaker": "Anas",
        "text": "طب قوليلي..."
      },
      {
        "speaker": "Anas",
        "text": "نخلي اللحظة دي ذكرى إزاي؟"
      },
      {
        "id": "scene_11_sunset_1",
        "options": [
          {
            "id": "scene_11_sunset_1_A",
            "label": "أحضنه ♡",
            "motion": "longHug",
            "lines": [
              {
                "speaker": "Sama",
                "text": "مبسوطة إننا هنا سوا."
              },
              {
                "speaker": "Anas",
                "text": "وأنا مبسوط إنك معايا."
              }
            ]
          },
          {
            "id": "scene_11_sunset_1_B",
            "label": "أمسك إيده ونتفرج على الغروب",
            "motion": "sunHands",
            "lines": [
              {
                "speaker": "Sama",
                "text": "نفسي اللحظة دي تطول."
              },
              {
                "speaker": "Anas",
                "text": "خليها من الذكريات الحلوة عندنا."
              }
            ]
          },
          {
            "id": "scene_11_sunset_1_C",
            "label": "أبعتله قلب وأضحك",
            "motion": "sendHeart",
            "lines": [
              {
                "speaker": "Anas",
                "text": "إيه ده؟ هدية تانية؟"
              },
              {
                "speaker": "Sama",
                "text": "آه، مخصوص ليك."
              },
              {
                "speaker": "Anas",
                "text": "طب ده هحتفظ بيه."
              }
            ]
          }
        ],
        "prompt": "اختاري لحظتنا عند الغروب ♡"
      },
      {
        "speaker": "Anas",
        "text": "عارفة إيه أحلى حاجة في اليوم؟"
      },
      {
        "speaker": "Sama",
        "text": "إيه؟"
      },
      {
        "speaker": "Anas",
        "text": "إن كل لحظة عادية بقت مميزة عشان قضيناها سوا."
      },
      {
        "speaker": "Sama",
        "text": "كلامك حلو النهارده."
      },
      {
        "speaker": "Anas",
        "text": "بس النهارده؟"
      },
      {
        "speaker": "Sama",
        "text": "ههههه خلاص، كل يوم."
      },
      {
        "motion": "bench"
      },
      {
        "speaker": "Sama",
        "text": "الدنيا بدأت تليل."
      },
      {
        "speaker": "Anas",
        "text": "تعالي نرجع ونكمل آخر جزء من يومنا."
      }
    ]
  },
  {
    "id": "scene_12_return_home",
    "chapter": 4,
    "place": "evening",
    "steps": [
      {
        "speaker": "Sama",
        "text": "أنا مش مصدقة إن اليوم قرب يخلص."
      },
      {
        "speaker": "Anas",
        "text": "استني، لسه مخلصش."
      },
      {
        "speaker": "Sama",
        "text": "لسه فيه مفاجأة؟"
      },
      {
        "speaker": "Anas",
        "text": "حاجة بسيطة... بس كيوت."
      },
      {
        "speaker": "Sama",
        "text": "أنا بقيت خايفة من مفاجآتك."
      },
      {
        "speaker": "Anas",
        "text": "ههههه ليه بس؟"
      },
      {
        "speaker": "Sama",
        "text": "عشان كل شوية بتطلعلي بحاجة."
      },
      {
        "speaker": "Anas",
        "text": "طب آخر واحدة، وعد."
      },
      {
        "id": "scene_12_return_home_1",
        "options": [
          {
            "id": "scene_12_return_home_1_A",
            "label": "أمسك إيده",
            "motion": "walkHands",
            "lines": [
              {
                "speaker": "Anas",
                "text": "إحنا كده تقريبًا وصلنا."
              }
            ]
          },
          {
            "id": "scene_12_return_home_1_B",
            "label": "أمشي جنبه وأهزر معاه",
            "motion": "walkLaugh",
            "lines": [
              {
                "speaker": "Sama",
                "text": "آخر مفاجأة بجد؟"
              },
              {
                "speaker": "Anas",
                "text": "بجد... تقريبًا."
              },
              {
                "speaker": "Sama",
                "text": "أنس!"
              },
              {
                "speaker": "Anas",
                "text": "ههههه خلاص خلاص."
              }
            ]
          }
        ],
        "prompt": "نكمل الطريق إزاي؟"
      },
      {
        "motion": "houseReveal"
      },
      {
        "speaker": "Sama",
        "text": "إيه البيت الكيوت ده؟"
      },
      {
        "speaker": "Anas",
        "text": "تعالي أوريكي."
      }
    ]
  },
  {
    "id": "scene_13_living_room",
    "chapter": 4,
    "place": "living",
    "steps": [
      {
        "speaker": "Sama",
        "text": "الأوضة دي كيوت أوي!"
      },
      {
        "speaker": "Anas",
        "text": "عارف إنها هتعجبك."
      },
      {
        "speaker": "Sama",
        "text": "بحب الإضاءة دي."
      },
      {
        "speaker": "Anas",
        "text": "طب تعالي نقعد شوية."
      },
      {
        "motion": "sofa"
      },
      {
        "speaker": "Anas",
        "text": "تعبتي من المشي؟"
      },
      {
        "speaker": "Sama",
        "text": "شوية بس."
      },
      {
        "speaker": "Anas",
        "text": "طب نرتاح هنا."
      },
      {
        "id": "scene_13_living_room_1",
        "options": [
          {
            "id": "scene_13_living_room_1_A",
            "label": "أقعد جنبه وأمسك إيده",
            "motion": "sitHands",
            "lines": [
              {
                "speaker": "Sama",
                "text": "كده أحسن."
              },
              {
                "speaker": "Anas",
                "text": "أهو ارتحنا أخيرًا."
              }
            ]
          },
          {
            "id": "scene_13_living_room_1_B",
            "label": "أسند على كتفه ♡",
            "motion": "lean",
            "lines": [
              {
                "speaker": "Anas",
                "text": "مرتاحه كده؟"
              },
              {
                "speaker": "Sama",
                "text": "آه."
              },
              {
                "speaker": "Anas",
                "text": "طب خليكي براحتك."
              }
            ]
          },
          {
            "id": "scene_13_living_room_1_C",
            "label": "نقعد ونضحك على اللي حصل النهارده",
            "motion": "sitLaugh",
            "lines": [
              {
                "speaker": "Sama",
                "text": "فاكر لما كنت بتجري ورايا؟"
              },
              {
                "speaker": "Anas",
                "text": "آه، وإنتِ كنتِ فاكرة إني مش هلحقك."
              },
              {
                "speaker": "Sama",
                "text": "ههههه."
              }
            ]
          }
        ],
        "prompt": "نقعد إزاي؟"
      },
      {
        "speaker": "Anas",
        "text": "اليوم كان مليان حاجات حلوة."
      },
      {
        "speaker": "Sama",
        "text": "أكتر حاجة حبيتها إننا كنا سوا."
      },
      {
        "speaker": "Anas",
        "text": "وده عندي أهم من أي مكان رحناه."
      }
    ]
  },
  {
    "id": "scene_14_bedroom",
    "chapter": 4,
    "place": "bedroom",
    "steps": [
      {
        "speaker": "Sama",
        "text": "ياااه، الأوضة دي كيوت أوي!"
      },
      {
        "speaker": "Anas",
        "text": "استني بس، شوفي النور."
      },
      {
        "motion": "lights"
      },
      {
        "speaker": "Sama",
        "text": "واااو!"
      },
      {
        "speaker": "Anas",
        "text": "عجبتك؟"
      },
      {
        "speaker": "Sama",
        "text": "جدااا."
      },
      {
        "speaker": "Anas",
        "text": "كنت عايز آخر اليوم يبقى هادي وجميل."
      },
      {
        "speaker": "Sama",
        "text": "هو فعلًا جميل."
      },
      {
        "motion": "bedSit"
      },
      {
        "speaker": "Anas",
        "text": "طب عندي سؤال أخير."
      },
      {
        "speaker": "Sama",
        "text": "قول."
      },
      {
        "speaker": "Anas",
        "text": "إيه أكتر لحظة حبيتيها النهارده؟"
      },
      {
        "id": "scene_14_bedroom_1",
        "options": [
          {
            "id": "scene_14_bedroom_1_A",
            "label": "أول ما شوفتك ♡",
            "motion": "first",
            "lines": [
              {
                "speaker": "Sama",
                "text": "أول ما شوفتك."
              },
              {
                "speaker": "Anas",
                "text": "طب كده بداية اليوم كسبت."
              }
            ]
          },
          {
            "id": "scene_14_bedroom_1_B",
            "label": "لما كنا عند البحر",
            "motion": "bubble",
            "lines": [
              {
                "speaker": "Sama",
                "text": "لما كنا قاعدين عند البحر."
              },
              {
                "speaker": "Anas",
                "text": "أنا كمان حبيت اللحظة دي أوي."
              }
            ]
          },
          {
            "id": "scene_14_bedroom_1_C",
            "label": "كل اليوم",
            "motion": "celebrate",
            "lines": [
              {
                "speaker": "Sama",
                "text": "كل اليوم كان حلو."
              },
              {
                "speaker": "Anas",
                "text": "طب دي أحلى إجابة ممكن أسمعها."
              }
            ]
          }
        ],
        "prompt": "إيه أحلى لحظة في يومنا؟"
      },
      {
        "speaker": "Anas",
        "text": "عارفة يا سما؟"
      },
      {
        "speaker": "Sama",
        "text": "إيه؟"
      },
      {
        "speaker": "Anas",
        "text": "مش مهم عندي اليوم كان طويل ولا قصير."
      },
      {
        "speaker": "Anas",
        "text": "المهم إنه كان فيه ضحك وذكريات حلوة معاكي."
      },
      {
        "speaker": "Sama",
        "text": "وأنا اتبسطت أوي."
      },
      {
        "speaker": "Anas",
        "text": "طب نختم اليوم بإيه؟"
      },
      {
        "id": "scene_14_bedroom_4",
        "options": [
          {
            "id": "scene_14_bedroom_4_A",
            "label": "حضن صغير",
            "motion": "bedHug",
            "lines": [
              {
                "speaker": "Anas",
                "text": "تصبحي على خير يا سما."
              },
              {
                "speaker": "Sama",
                "text": "وإنت من أهله."
              }
            ]
          },
          {
            "id": "scene_14_bedroom_4_B",
            "label": "أسند على كتفه ونتفرج على النجوم",
            "motion": "stars",
            "lines": [
              {
                "speaker": "Anas",
                "text": "شايفة النجوم؟"
              },
              {
                "speaker": "Sama",
                "text": "آه."
              },
              {
                "speaker": "Anas",
                "text": "خلي الليلة دي ذكرى حلوة."
              }
            ]
          },
          {
            "id": "scene_14_bedroom_4_C",
            "label": "نضحك ونقول لبعض تصبح على خير",
            "motion": "wave",
            "lines": [
              {
                "speaker": "Sama",
                "text": "تصبح على خير يا أنس."
              },
              {
                "speaker": "Anas",
                "text": "وإنتِ من أهله يا سما."
              }
            ]
          }
        ],
        "prompt": "اختاري آخر لحظة ♡"
      }
    ]
  },
  {
    "id": "scene_15_ending",
    "chapter": 4,
    "place": "bedroom",
    "steps": [
      {
        "speaker": "",
        "text": "كان يوم بسيط..."
      },
      {
        "speaker": "",
        "text": "مش لازم يكون فيه حاجات كبيرة عشان يبقى مميز."
      },
      {
        "speaker": "",
        "text": "كفاية ضحكة..."
      },
      {
        "speaker": "",
        "text": "ومشوار صغير..."
      },
      {
        "speaker": "",
        "text": "ولحظات حلوة بنفتكرها."
      },
      {
        "speaker": "",
        "text": "وأحلى حاجة في اليوم كله..."
      },
      {
        "speaker": "",
        "text": "إننا قضيناه سوا."
      }
    ]
  }
];

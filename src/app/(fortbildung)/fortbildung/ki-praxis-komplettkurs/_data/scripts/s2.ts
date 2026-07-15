// Aufnahme-Skripte pro Video-Lektion — automatisch aus den tatsächlichen Aufnahmen
// (Whisper-Transkript, Marken/Bindestriche normalisiert). Stand: 2026-07-15.

export const s2Scripts: Record<string, string> = {
  "s2-1": `[0:01] Willkommen im Crashkurs KI. Diese Sektion hat eine einzige Aufgabe. Egal wo du startest, am Ende dieser 85 Minuten stehen wir alle auf derselben Startlinie.

[0:11] Dieser Kurs hat ein Mischpublikum. Manche von euch nutzen ChatGPT schon seit Jahren, andere haben gerade erst getraut, sich überhaupt einen Account anzulegen.

[0:20] Beides ist völlig in Ordnung. Wenn du schon Profi bist, sieh den Crashkurs als schnelles Aufwärmen und springe danach direkt in Modul 1.

[0:27] Was wir in dieser Sektion machen, erst ein mentales Modell, was künstliche Intelligenz eigentlich ist und was ein Sprachmodell so tut.

[0:36] Dann die drei großen Plattformen, ChatGPT, Claude und Gemini. Dann gehen wir live ins Tool.

[0:43] Dein erster Account, dein erster Prompt und zum Schluss die ersten echten Lehrer-Use-Cases, mit denen du dich ab morgen entlasten kannst.

[0:49] Drei Versprechen für diese Sektion. Erstens, wir bleiben praktisch. Du guckst mir über die Schulter, wir werden viel ausprobieren, ihr werdet viel sehen.

[1:00] Zweitens, wir bleiben ehrlich. Ich zeige dir auch, wo künstliche Intelligenz missbaut und wo es problematisch werden kann.

[1:08] Drittens, du brauchst keinerlei Vorkenntnisse und kein bezahltes Abo. Alles geht mit den kostenlosen Versionen oder mit dem AIS-Chat.

[1:17] Eine Sache noch, mach diesen Kurs mit offenem Laptop oder Tablet. Nicht nur zuschauen, mitmachen ist besser.

[1:24] Pausiere, wann immer du willst und probiere selber eigene Ideen aus. Take-away. Der Crashkurs ist die gemeinsame Startrampe.

[1:34] Danach sind wir alle bereit für die Module. In der nächsten Lektion klären wir die Grundfrage, was ist künstliche Intelligenz eigentlich?

[1:42] Ein einfaches mentales Modell.

[END 1:46]`,

  "s2-2": `[0:01] Bevor wir irgendwas tippen, brauchst du ein mentales Modell. Nicht um Informatikerin oder Informatiker zu werden, sondern um zu verstehen, warum die künstliche Intelligenz sich so verhält, wie sie sich verhält.

[0:13] Künstliche Intelligenz ist ein riesiger Oberbegriff. Für diesen Kurs interessiert uns vor allem ein Ausschnitt davon.

[0:19] Die sogenannten Sprachmodelle. Auf Englisch Large Language Models, kurz LLNs. ChattyBT, Claude und Gemini sind alles Sprachmodelle.

[0:28] Bevor wir das Bild schärfen, probiere KI einmal selbst aus. Es dauert nur eine Minute. Öffne hier Quickdraw with Google und zeichne ein paar Dinge.

[0:41] Die künstliche Intelligenz rät in Echtzeit, was du malst. Das macht Spaß und es zeigt, auch das ist künstliche Intelligenz.

[0:49] Aber Achtung, das ist ein anderer Typ künstlicher Intelligenz. Bild- und Mustererkennung, kein Sprachmodell. Uns geht es in diesem Kurs um die Sprachmodelle.

[0:57] Wie die arbeiten, machen wir gleich sichtbar. Hier das einfachste Bild, das funktioniert. Ein Sprachmodell ist eine extrem gut trainierte Vervollständigungsmaschine.

[1:07] Es hat unfassbar viele Texte gelesen, Bücher, Webseiten, Artikel und dabei eine einzige Sache gelernt.

[1:14] Welches Wort kommt als nächstes am wahrscheinlichsten? Das klingt erstmal banal, aber aus dieser einen Fähigkeit, das nächste Wort vorherzusagen, entsteht etwas Erstaunliches.

[1:25] Die Maschine kann formulieren, zusammenfassen, übersetzen, erklären, umschreiben und so weiter und so weiter.

[1:33] Nicht, weil sie versteht wie ein Mensch, sondern weil sie Sprache statistisch meisterhaft beherrscht.

[1:39] Warum ist dieses Bild für dich als Lehrkraft wichtig? Weil es zwei Dinge sofort erklärt. Erstens, warum künstliche Intelligenz so gewandt ist.

[1:48] Sprache ist genau ihre Kernkompetenz. Zweitens, warum sie manchmal selbstbewusst völligen Unsinn behauptet.

[1:55] Dazu aber mehr in einer weiteren Lektion. Was künstliche Intelligenz nicht ist, sie ist keine Suchmaschine mit Datenbanken, in der die Wahrheit steht.

[2:05] Sie ist kein Mensch mit Meinung und Gewissen. Und sie ist kein Taschenrechner, der immer exakt rechnet.

[2:11] Sie ist ein Sprachwerkzeug und wie jedes Werkzeug ist sie nur so gut wie die Hand, die es führt.

[2:16] Take-away. Sprachmodell ist gleich die Vervollständigungsmaschine, die das wahrscheinlichste nächste Wort wählt.

[2:27] Genial mit Sprache, kein Wahrheitsautomat. In der nächsten Lektion machen wir genau das sichtbar, an einem winzigen Sprachmodell, das du selbst ausprobieren kannst.

[2:37] Wie arbeitet so ein Sprachmodell eigentlich?

[END 2:41]`,

  "s2-3": `[0:01] Jetzt steigen wir ein bisschen tiefer ein. Aber keine Sorge, weiterhin ohne Mathe. Ich will, dass du nach dieser Lektion ein Gefühl dafür hast, warum künstliche Intelligenz tut, was sie tut.

[0:12] Stelle dir vor, ich sage, die Hauptstadt von Frankreich ist und du ergänzt automatisch in deinem Kopf Paris.

[0:19] Genau das macht ein Sprachmodell, nur in riesigem Maßstab und für jede erdenkliche Satzfortsetzung.

[0:25] Ich zeige dir das einmal Schritt für Schritt. Nimm zum Beispiel den Satzanfang Houston wir haben.

[0:33] Genau diesen Kontext bekommt das Modell als Eingabe. Seine einzige Aufgabe ist, das nächste Wort bzw.

[0:42] den nächsten Token vorherzusagen. Hier wäre das ein. Wie entscheidet es sich? Es gibt jedem möglichen nächsten Wort eine Wahrscheinlichkeit.

[0:53] Ein bekommt vielleicht 90 Prozent, eine fünf, seine zwei und tausende andere Wörter winzige Reste dieser Wahrscheinlichkeitsberechnung.

[1:04] Dann hängt es das wahrscheinlichste Wort an, ein, und fängt von vorne an. Jetzt lautet der Kontext Houston wir haben ein und das Modell sagt das nächste Wort voraus.

[1:17] Problem. Wort für Wort, immer wieder, so entsteht die ganze Antwort. Diese ständige Wiederholung ist übrigens der Grund, warum Chet Chibiti seine Antworten früher so stotternd beziehungsweise Stück für Stück ausgegeben hat, da diese Berechnung recht viel Zeit gebraucht hat.

[1:34] Willst du das mit eigenen Augen sehen? Gehe auf soekia. ch, ein winziges Sprachmodell, das direkt im Browser läuft.

[1:41] Du gibst einen Satzanfang ein und das zeigt dir Schritt für Schritt, welches Wortbaustein bzw.

[1:48] welcher Token es als nächstes für am wahrscheinlichsten hält samt der Alternativen, die es verwirft.

[1:55] Genau das, nur millionenfach größer, passiert in Chet Chibiti oder Claude. Wenn du dieses Würfeln einmal gesehen hast, verstehst du den Rest des Kurses vielleicht leichter.

[2:06] Daraus folgen drei praktische Eigenschaften, die du kennen musst. 1. Kontext ist alles. Die künstliche Intelligenz sieht nur, was im Gespräch steht.

[2:17] Je klarer und vollständiger dein Input, desto besser der Output. Müll rein, Müll raus gilt hier doppelt.

[2:25] 2. Jede Antwort ist neu gewürfelt. Stell dieselbe Frage zweimal und du bekommst zwei leicht unterschiedliche Antworten.

[2:33] Das ist kein Fehler, das ist eingebaut. Praktisch heißt das, wenn dir eine Antwort nicht gefällt, lass einfach neu generieren.

[2:41] 3. Die künstliche Intelligenz hat ein Gedächtnislimit. Innerhalb eines Chats erinnert sie sich an das Gesagte, aber in einem neuen Chat fängt sie häufig bei Null an.

[2:53] Für Zusammenhängendes also immer erstmal im selben Chat bleiben. Und ein wichtiger Punkt zum Wissensstand.

[3:01] Jedes Modell hat einen Trainingsstichtag. Über Ereignisse danach weiß es von sich aus nichts.

[3:08] Es sei denn, das Tool kann live im Internet suchen und Informationen nachschlagen. Manche können das, manche aber auch nicht.

[3:17] Mehr dazu in einer weiteren Lektion. Take-away. Drei Regeln. Kontext entscheidet, Antworten sind jedes Mal neu, ein Chat ist ein Gedächtnis.

[3:28] Das erklärt 90 Prozent des KI-Verhaltens. In der nächsten Lektion lernst du die drei großen Plattformen kennen.

[3:35] ChatGBT, Claude und Gemini.

[END 3:39]`,

  "s2-kontext-tempo": `[0:00] Kurze Zwischenfrage, bevor wir zu den Plattformen kommen. Warum redet die ganze Welt über künstliche Intelligenz?

[0:06] Zwei Bilder machen das tempogreifbar. Schaue auf die Entwicklung der Sprachmodelle. 2017 die Grundidee, der sogenannte Transformer.

[0:17] 2018 das erste GPT mit 117 Millionen Parametern. Grob gesagt die Stellschrauben im Modell.

[0:26] Und dann geht es Schlag auf Schlag. Hunderte Millionen, Milliarden und heute schätzt man beim Spitzenmodell rund 1,8 Billionen.

[0:35] Du musst dir die Namen und die Parameter nicht merken. Der Punkt ist alleine die Geschwindigkeit. Und genauso rasant die Verbreitung.

[0:43] Netflix hat dreieinhalb Jahre gebraucht, um 100 Millionen Nutzer zu erreichen. Instagram zweieinhalb Monate, Chat-GPT nur zwei Monate.

[0:53] Die allererste Million war sogar schon nach fünf Tagen da. Die am schnellsten verbreitete Consumer App aller Zeiten.

[1:00] Warum ist das für dich als Lehrkraft wichtig? Weil deine Schülerinnen und Schüler längst mittendrin sind.

[1:06] Und weil sich die Werkzeuge so schnell verbessern, dass es sich lohnt jetzt einzusteigen. Du musst nicht alles können, aber dabei sein zahlt sich mittlerweile aus.

[1:16] Take-away. In wenigen Jahren von 117 Millionen auf geschätzte 1,8 Billionen Parameter. Und die schnellste Verbreitung, die es je gab.

[1:26] KI ist keine Modeerscheinung, sondern hier, um zu bleiben. In der nächsten Lektion schauen wir uns die drei großen Plattformen an, mit denen du arbeiten wirst.

[END 1:37]`,

  "s2-4": `[0:00] Es gibt drei große Plattformen, die du kennen solltest. Alle drei können fast alles, was wir in diesem Kurs brauchen.

[0:06] Du musst dich nicht festlegen, aber es hilft, die Unterschiede grob zu kennen. ChetGPT von OpenAI. Der bekannteste Name, quasi das Standardwerkzeug.

[0:16] Sehr ausgereift, großes Ökosystem, viele Zusatzfunktionen. Wenn du nur einen Account anlegen willst, ist das ein relativ sicherer Start.

[0:26] Claude von Anthropic. Stark beim Schreiben, beim Umgang mit langen Texten und bei sorgfältigen, durchdachten Antworten.

[0:34] Viele Lehrkräfte mögen Claude für Formulierungs- und Korrekturaufgaben. Gemini von Google.

[0:40] Tief in die Google-Welt integriert. Docs, Gmail und Drive. Wenn deine Schule mit Google Workspace arbeitet, ist Gemini oft naheliegend.

[0:48] In Deutschland allerdings eher die Ausnahme. Welche solltest du nehmen? Meine ehrliche Antwort, es ist weniger wichtig, als du denkst.

[0:58] Die Unterschiede sind für den Schulalltag relativ klein. Wichtiger als die Wahl ist, dass du eine auswählst und damit anfängst und das User Interface und das Handling zu dir passt.

[1:13] Mein Tipp für diesen Kurs, leg dir ChetGPT oder Claude an, weil ich da die meisten Demos zeige.

[1:19] Wenn du später Lust hast, probiere weitere aus. Gerade beim Faktencheck ist es sogar nützlich, zwei oder drei künstliche Intelligenzen gegeneinander antreten zu lassen.

[1:29] Das sehen wir aber noch in Modul 1. Alle drei haben kostenlose Versionen, die für den Einstieg völlig ausreichen.

[1:37] Die Bezahlabos, oft Plus oder Pro genannt, geben dir leistungsstärkere Modelle und mehr Funktionen.

[1:44] Aber das brauchst du jetzt an dieser Stelle noch nicht. Take-away. ChetGPT, Claude, Gemini.

[1:51] Alle drei taugen. Nimm eine und fang an. Direkt unter diesem Video wartet der Plattformfinder auf dich.

[1:59] Der Plattformfinder gibt dir eine grobe Orientierung, welche dieser drei Plattformen ganz gut zu dir passen könnten.

[2:07] Viel Spaß beim Ausprobieren.

[END 2:11]`,

  "s2-5": `[0:00] Jetzt wird es praktisch. Wir legen gemeinsam einen Account an und ich zeige dir die Oberfläche.

[0:05] Pausiere das Video und mach parallel mit. Gehe auf ChatGPT. com, klicke auf Anmelden und registriere dich mit einer E-Mail-Adresse.

[0:14] Tipp, nutze dafür am besten nicht eine dienstliche, sondern eine private oder eigens angelegte Adresse.

[0:19] Das hält Privates und Schulisches sauber getrennt. So sieht die Oberfläche aus. In der Mitte das Eingabefeld. Hier tippst du deine Fragen und Anweisungen.

[0:28] Das nennt man einen Prompt. Links die Chat-Leiste. Jedes Gespräch wird hier gespeichert. Erinnerst du dich noch an die vorangegangene Lektion Ein Chat, ein Gedächtnis?

[0:39] Für ein neues Thema klickst du oben auf Neuen Chat. Oben siehst du oft die Modellauswahl. In der kostenlosen Version musst du dich allerdings meistens nicht darum kümmern.

[0:51] Die Standardeinstellung ist für die meisten Vorhaben absolut ausreichend. Merke dir, wenn du mal die Wahl hast, sind die Modelle mit höheren Nummern in der Regel die stärkeren.

[1:01] Ganz unten oder im Menü findest du oft Symbole für Datei-Uploads, Bilder und Spracheingaben.

[1:06] Die schauen wir uns in einer anderen Lektion noch genauer an. Das war's schon. Die Oberfläche ist mit Absicht simpel. Ein Eingabefeld, eine Liste alter Gespräche, fertig.

[1:17] Lass dich davon nicht einschüchtern. Die ganze Magie passiert im Gespräch, nicht in den Menüs.

[1:23] Take-away. Account anlegen, Eingabefeld finden, neuer Chat für neue Themen. Mehr brauchst du fürs Erste noch nicht.

[1:31] In der nächsten Lektion schreibst du live deinen ersten Prompt.

[END 1:35]`,

  "s2-6": `[0:01] Jetzt der Moment, auf den es ankommt, dein erster echter Prompt. Ich tippe live und du guckst mir über die Schulter und danach machst du es selbst.

[0:10] Ich fange bewusst simpel an. So, erkläre mir in drei Sätzen, was Photosynthese ist, sodass es eine siebte Klasse versteht.

[0:20] Und dann lösen wir einmal aus und nach einer kurzen Zeit kommt schon eine saubere und altersgerechte Erklärung.

[0:30] Schau, wie schnell das geht. Jetzt der entscheidende Schritt, den Anfänger oft vergessen. Ich bin noch nicht fertig, ich bleibe im Gespräch und verfeinere.

[0:40] Danke, mach es noch einfacher und baue ein Alltagsbeispiel ein. Die KI baut den Text um. Das ist der Kern. Es ist ein Dialog, kein einmaliger Knopfdruck.

[0:53] Siehst du, was gerade passiert ist? Ich musste nicht den perfekten Prompt von Anfang an treffen.

[0:58] Ich habe angefangen und dann nachgesteuert. Das nimmt enormen Druck raus. Du kannst gar nichts kaputt machen.

[1:04] Zurück ins Tool. Lass uns drei weitere typische Einstiege ausprobieren. Möglichkeit 1 Formuliere diese E-Mail freundlicher.

[1:13] Ich schreibe als Sportkollege oder vielleicht auch als Klassenlehrer eine E-Mail an meine Eltern.

[1:20] Und es geht um den klassischen Fall, dass die Kids die Sportklamotten oder dass viele die Trinkflaschen im Sportunterricht nicht mit dabei sind oder verloren gegangen sind.

[1:34] Ich möchte jetzt die Eltern einmal schnell darüber informieren, dass die Sachen wichtig sind für den Sportunterricht.

[1:40] Ich möchte aber jetzt nicht diese E-Mail ausformulieren, deshalb könnte ich so etwas probieren.

[1:46] Wir gucken einmal rein. Über diesen Button können wir sehr gut diese E-Mail kopieren und dann in das E-Mail-Programm unserer Wahl überführen.

[1:53] Eine zweite Möglichkeit wäre beispielsweise, sich eine gewisse Inspirationshilfe geben zu lassen, zum Beispiel zum Thema Stundeneinstiege.

[2:02] Und vielleicht unterrichtet man in Geografie gerade das Thema Vulkane und könnte zum Beispiel einmal prompten, gib mir fünf Ideen für einen spannenden Stundeneinstieg zum Thema Vulkane.

[2:15] Und hier seht ihr, das geht dann direkt los und es werden unterschiedliche Möglichkeiten von der künstlichen Intelligenz angeboten.

[2:23] Die KI gibt einem fünf spannende Ideen für einen Unterrichtseinstieg zum Thema Vulkane aus.

[2:30] Das dritte Beispiel wäre, fasse diesen Text in fünf Stichpunkten zusammen. Ich habe hier einmal einen Text über wichtige Regeln im Fußball genommen und ich möchte das jetzt in fünf Stichpunkten zusammengefasst haben und dann kann ich quasi diese Funktion auch nutzen und direkt beispielsweise kopierte Webseiten oder PDF-Dokumente einmal in diesen Chat einzufügen und dann mit der Frage zu versehen, fasse diesen Text in fünf Stichpunkten zusammen.

[3:03] Und so habe ich die Möglichkeit, künstliche Intelligenz so zu nutzen, dass es mir eine Zusammenfassarbeit erleichtert.

[3:10] Achtet darauf, wie unterschiedlich die Aufgaben sind. Erklären, umformulieren, Ideen liefern, zusammenfassen.

[3:18] Das sind schon vier der häufigsten Lehrereinwendungen und du beherrschst sie nach fünf Minuten.

[3:25] Jetzt du, pausiere das Video, öffne deinen Chat, tippe irgendetwas ein, das dich aus deinem Fach interessiert.

[3:33] Es gibt kein Falsch. Wenn die Antwort nicht passt, sag der künstlichen Intelligenz einfach, was du anders möchtest.

[3:39] Jetzt einmal Pause und ausprobieren. Take-away. Einfach anfangen, im Gespräch bleiben, nachsteuern, du kannst nichts kaputt machen.

[3:48] In der nächsten Lektion zerlegen wir, was einen wirklich guten Prompt ausmacht.

[END 3:56]`,

  "s2-7": `[0:00] In der letzten Lektion haben wir einfach drauf losgetippt und das ist genau richtig zum Starten.

[0:05] Jetzt machen wir deine Prompts systematisch besser. Es gibt vier Bausteine, die fast jeden Prompt verbessern.

[0:12] Baustein 1. Die Rolle. Sagt der künstlichen Intelligenz, wer sie sein soll. Du bist eine erfahrene Grundschullehrerin oder du bist Lektor für Schulbücher.

[0:24] Das aktiviert genau den richtigen Tonfall und Wortschatz. Baustein 2. Die Aufgabe. Klar und konkret. Nicht etwas zu brüchen, sondern erstelle fünf Übungsaufgaben zur Addition von Brüchen.

[0:40] Baustein 3. Der Kontext. Für wen? In welcher Situation? Zum Beispiel für eine sechste Klasse, eher leistungsschwach als Hausaufgabe.

[0:50] Je mehr relevanter Kontext, desto passender das Ergebnis. Baustein 4. Das Format. Wie soll das Ergebnis aussehen? Als Tabelle, in Stichpunkten, maximal 200 Wörter, mit Lösung am Ende.

[1:05] Schaue dir den Unterschied an. Erst der schwache Prompt. Mach was zu Brüchen. Das Ergebnis ist relativ beliebig.

[1:12] Jetzt mit allen vier Bausteinen. Du bist eine erfahrene Mathematiklehrerin. Erstelle fünf Übungsaufgaben zur Addition von Brüchen.

[1:20] Für eine sechste Klasse, eher leistungsschwach als Hausaufgabe. Format, nummerierte Liste, steigende Schwierigkeit, Lösung am Ende.

[1:30] Schaue dir den Unterschied an. Das zweite Ergebnis ist sofort einsetzbar. Vier Bausteine, ein paar Sekunden mehr Tipparbeit, ein riesiger Qualitätssprung.

[1:41] Du musst nicht immer alle vier nutzen. Aber wenn ein Ergebnis enttäuscht, frag dich, welcher Baustein hat eventuell gefehlt.

[1:48] Meistens war es Kontext oder Format. Nimm dir kurz fünf Minuten Zeit und probiere das für dein eigenes Beispiel aus.

[1:56] Take-away. Rolle, Aufgabe, Kontext, Format. Vier Bausteine, bei schlechten Ergebnissen fehlt fast immer einer davon.

[2:06] Direkt unter diesem Video wartet der Promptbilder auf dich. Baue deinen ersten Prompt aus genau diesen vier Bausteinen.

[2:13] Viel Spaß beim Ausprobieren.

[END 2:14]`,

  "s2-8": `[0:01] Die wichtigste Fähigkeit im Umgang mit künstlicher Intelligenz ist nicht der perfekte erste Prompt.

[0:07] Es ist das Nachsteuern. Profis erkennt man darin, dass sie nach der ersten Antwort weitermachen.

[0:13] Hier sind die nützlichsten Nachsteuersätze, die du dir merken solltest. Ich nenne sie meine Iterationssätze.

[0:20] Mach es kürzer, mach es länger, länger anpassen, mach es einfacher, anspruchsvoller, Niveau anpassen, gib mir drei Varianten zur Auswahl, erzeuge Optionen, ändere den Ton zu wertschätzend, sachlich oder logfähig.

[0:35] Und mein Lieblingssatz, wenn ich selbst nicht weiter weiß, welche Informationen brauchst du noch von mir, um ein besseres Ergebnis zu liefern?

[0:43] Dann dreht die künstliche Intelligenz den Spieß um und fragt dich. Und plötzlich wird das Ergebnis viel besser.

[0:49] Ein Denkfehler, den ich oft sehe, Leute bekommen eine mittelmäßige Antwort, sind enttäuscht und schließen den Chat.

[0:56] Das ist, als würdest du nach der ersten Antwort eines Kollegen direkt immer das Gespräch abbrechen.

[1:02] Bleib dran, die zweite und dritte Runde sind oft die besseren. Wichtig, bleib für ein Thema im selben Chat.

[1:08] Die künstliche Intelligenz erinnert sich dann an alles Vorherige und du musst nicht ständig den Kontext wiederholen.

[1:14] Erst für ein komplett neues Thema öffne einen neuen Chat. Take-away, die erste Antwort ist ein Entwurf, kein Endprodukt.

[1:23] Iterieren ist die eigentliche Kernkompetenz im Umgang mit künstlicher Intelligenz. In der nächsten Lektion geht es um den wichtigsten Stolperstein, wenn die künstliche Intelligenz Unsinn behauptet.

[1:36] Halluzination.

[END 1:37]`,

  "s2-9": `[0:00] Diese Lektion ist die wichtigste der ganzen Sektionen. Wenn du nur eine Sache aus dem Crash-Kurs mitnimmst, dann diese.

[0:05] KI kann selbstbewusst Dinge behaupten, die schlicht falsch sind. Man nennt das Halluzination. Erinnerst du dich an unser mentales Modell aus den vergangenen Lektionen?

[0:15] Die künstliche Intelligenz wählt das wahrscheinlichste nächste Wort. Sie strebt nach einem Text, der plausibel klingt, nicht zwingend nach einem, der wahr ist.

[0:25] Meistens fällt beides zusammen. Manchmal aber auch nicht. Und genau dann wird es gefährlich, weil die falsche Antwort genauso überzeugend klingt, wie die richtige.

[0:35] Ich frage nach einer Quellenangabe oder einem Zitat zu einem Nischenthema. Und schau, die KI liefert einen Buchtitel mit Auto und Jahreszahl, der absolut echt aussieht.

[0:47] Wenn ich danach suche, existiert er aber gar nicht. Frei erfunden, aber perfekt formatiert.

[0:52] Besonders fehleranfällig sind konkrete Fakten, Zahlen, Daten, Namen, Quellen und Zitate, Mathematik und alles, was nach dem Trainingsstichtag passiert ist.

[1:05] Was du dagegen tust? Drei einfache Regeln. 1. Behandle jede konkrete Faktenangabe als unbestätigt, bis du sie geprüft hast.

[1:15] 2. Verifiziere außerhalb der KI über eine Suchmaschine, ein Schulbuch oder eine vertrauenswürdige Seite.

[1:24] 3. Ganz wichtig. Frag die KI nicht, bist du sicher. Das funktioniert nicht. Sie wird genauso überzeugend zustimmen oder sich entschuldigen.

[1:35] Beides sagt aber nichts über die Wahrheit aus. Die gute Nachricht, für viele Schulaufgaben spielt das kaum noch eine Rolle.

[1:43] Wenn du einen Text umformulierst, Ideen sammelst oder eine E-Mail freundlicher machen lässt, kann nicht halluziniert werden.

[1:49] Das Risiko steckt vor allem in Fakten, die du selbst nicht überblickst. Genau da musst du Lehrkraft bleiben.

[1:56] Take-away. Künstliche Intelligenz klingt immer überzeugend, auch wenn sie falsch liegt. Jede konkrete Faktenangabe musst du außerhalb der KI prüfen.

[2:07] Bist du dir sicher, hilft nicht. Direkt unter diesem Video wartet der Halluzinationstrainer.

[2:13] Schätze 8 Szenarien ein und teste dein Gespür. Viel Erfolg!

[END 2:20]`,

  "s2-10": `[0:01] Kurzer, aber wichtiger Stopp. Im Crashkurs gehen wir bewusst nicht tief ins Thema Datenschutz.

[0:06] Das ist zu groß für hier und hat seinen eigenen Platz in den späteren Modulen. Aber 5 Minuten Grundregeln brauchst du, bevor wir loslegen.

[0:15] Eine goldene Regel. Gib keine personenbezogenen Daten von Schülerinnen, Eltern oder Kolleginnen oder auch dir in die künstliche Intelligenz ein.

[0:24] Keine echten Namen, Adressen, keine Noten mit Namen, keine Gesundheitsdaten. Der einfache Trick dafür heißt anonymisieren.

[0:33] Statt Mareike Schulz aus der 7b schreibst du einen Schülerin der siebten Klasse. Die künstliche Intelligenz macht trotzdem genau das, was du willst.

[0:42] Und du setzt die echten Namen erst nachher im fertigen Text wieder ein. Warum das Ganze? Vereinfacht, was du in viele kostenlose KI-Dienste eingibst, kann zur Verbesserung der Systeme weiterverwendet werden.

[0:55] Schülerdaten haben dort einfach nichts zu suchen. Das ist kein Grund zur Panik, nur ein Grund zur Sorgfalt.

[1:00] Zwei weitere schnelle Tipps. Erstens, in den Einstellungen vieler Tools kannst du das Mitlernen aus deinen Chats abschalten.

[1:09] Ein Blick lohnt sich. Zweitens, halte dich an das, was deine Schule und dein Bundesland freigegeben haben.

[1:16] Die Vorgaben unterscheiden sich zum Teil sehr stark von Bundesland zu Bundesland. Mehr dazu, rechtssicher und konkret, kommt in den späteren Modulen.

[1:26] Für jetzt reicht anonymisieren, keine Schülerdaten im erlaubten Rahmen bleiben. Take-away. Keine personenbezogenen Daten in die KI.

[1:35] Anonymisieren, echte Namen erst hinterher einsetzen. Der Rest folgt in den weiteren Modulen.

[1:41] In der nächsten Lektion wird es jetzt aber konkret. Deine ersten Lehrer-Use-Cases, die sofort entlasten.

[1:47] Bis gleich!

[END 1:50]`,

  "s2-kontext-nutzung": `[0:00] Bevor du gleich deine ersten eigenen Anwendungsfälle baust, ein kurzer, ehrlicher Blick nach draußen.

[0:05] Wofür nutzen Menschen künstliche Intelligenz eigentlich? Dazu gibt es eine große Untersuchung von 2025.

[0:13] 1. Die schiere Menge. Innerhalb eines Jahres ist die Zahl der KI-Nachrichten pro Tag von rund 450 Millionen auf 2,6 Milliarden gestiegen.

[0:23] Etwa das Sechsfache. Und immer mehr davon ist privat statt beruflich. Von gut der Hälfte auf fast drei Viertel.

[0:31] KI wandert vom Büro in den Alltag. 2. Wofür? Ganz oben stehen praktische Anleitungen, Informationen suchen und schreiben.

[0:42] Und, für uns besonders spannend, Tutoring und Lehren machen rund 10% der gesamten Nutzung aus.

[0:49] Eine der größten Einzelkategorien weltweit. Das heißt, genau das, was wir gleich üben, erklären, formulieren, Material erstellen, Dinge verständlicher machen, ist längst eine der häufigsten Anwendungsfälle überhaupt.

[1:02] Du bist damit nicht am Rand, sondern mitten im Trend. Take-away. Künstliche Intelligenz wird immer mehr privat genutzt.

[1:11] Und Anleiten, Informieren, Schreiben und Lehren steht ganz oben. Deine Use-Cases als Lehrkraft treffen also genau den Kern.

[1:19] Jetzt wird es konkret. In der nächsten Lektion baust du deine ersten 5 Use-Cases, die sofort entlasten.

[END 1:27]`,

  "s2-11": `[0:00] Jetzt der Teil für den du hier bist. Womit entlastest du dich ab morgen? Ich zeige dir fünf Use-Cases für den Unterricht und zum Schluss einen aus der Verwaltung, die sofort Zeit sparen.

[0:11] Alle mit den vier Promptbausteinen aus den vergangenen Lektionen. Wir starten mit dem ersten Use-Case, dem Stundeneinstieg.

[0:18] Hier können wir beispielsweise probieren zu sagen, du bist eine erfahrene Biologie Lehrkraft, gib mir fünf kreative Stundeneinstiege zum Thema Ökosystem, Wald für eine sechste Klasse.

[0:29] Pro Einstieg ein Satz, Beschreibung und das benötigte Material. Hier sehen wir jetzt die aufgeblätterten Ergebnisse.

[0:36] Das sollte soweit erstmal ganz gut passen und ermöglicht uns fünf kreative Stundeneinstiege.

[0:46] Use-Case zwei, Elternkommunikation und E-Mails. Hier können wir uns beispielsweise bei der Erstellung einer E-Mail unterstützen Formuliere eine freundliche, sachliche E-Mail an Eltern zur Ankündigung eines Wandertags.

[0:57] Hier seht ihr jetzt, wir haben eine vorgefertigte E-Mail erhalten und haben die Möglichkeit beispielsweise die Nachricht zu kopieren und dann weiter zu verwenden.

[1:10] Use-Case drei, Texte vereinfachen und Anfänge von Differenzierung. Ihr erinnert euch noch an den Text zu den Fußballregeln.

[1:20] Wir möchten jetzt diesen Text für die Unterstufe vereinfachen. Hier haben wir jetzt die Möglichkeit zu sagen, vereinfache diesen Sachtext für eine fünfte Klasse.

[1:31] Niveau A2, kurze Sätze, schwierige Wörter erklären. Hier seht ihr direkt eine tolle Funktion von Claude.

[1:37] Er hat uns jetzt diese Aufgabe bearbeitet und hat den vereinfachten Sachtext in ein neues Dokument überführt, was wir jetzt kopieren oder auch herunterladen können.

[1:50] Use-Case vier, Feedback formulieren. Wir haben mit künstlicher Intelligenz auch die Möglichkeit, relativ schnell zum Teil umfangreiches Feedback zu formulieren.

[2:02] Wir können uns zum Beispiel gezielt einen Schüler heraussuchen mit der Aufgabe, ihm ein schriftliches Feedback zu geben.

[2:10] Schreibe mir ein nettes und freundliches Feedback für einen Schüler. Hierbei wichtig, weiter so gute Leistung, weniger mit dem Nachbarn quatschen und nicht einfach während des Unterrichts aufstehen.

[2:19] Also ein wenig der Klassiker. Wir schauen einmal, wie uns künstliche Intelligenz dabei helfen kann.

[2:25] Und wir sehen direkt in der Antwort, hier haben wir ein solides Feedback formuliert, was wir, wenn wir den Namen noch einfügen, gut im Unterricht verwenden können.

[2:36] Use-Case fünf, Quiz und Übungen erstellen. Wir haben mit künstlicher Intelligenz auch die tolle Möglichkeit, relativ schnell Quizzes und Überprüfungen zu erstellen.

[2:48] Hier könnten wir als Beispiel nehmen, erstelle mir ein kurzes Quiz mit fünf Multiple-Choice-Fragen zum Thema Wasserkreislauf.

[2:54] Vierte Klasse. Pro Frage drei Antwortenmöglichkeiten, eine richtige und die Lösung am Ende.

[3:00] Wir schauen, was künstliche Intelligenz daraus macht. Und wir sehen das Quiz mit den entsprechenden richtigen Lösungen am Ende.

[3:06] Auch haben wir die Möglichkeit, das als Word-Dokument uns ausgeben zu lassen oder auch in die Überprüfungsportale unserer Schule oder unseres Vertrauens zu überführen.

[3:17] Dazu aber in den weiteren Lektionen in Modul 1 mehr. Und jetzt der Perspektivwechsel, der oft vergessen wird.

[3:25] KI entlastet nicht nur beim Unterrichten, sondern genauso bei Organisation und Verwaltung.

[3:30] Den Aufgaben, die dir abends die Zeit stehen. Use-Case sechs, die Klassenfahrt. Hier haben wir beispielsweise eine typische Situation.

[3:40] Als Lehrkraft, man muss eine Klassenfahrt planen, vielleicht nach Weimar. 28 Schülerinnen und Schüler, achte Klasse.

[3:48] Und neben dem Tagesplan brauchen wir auch eine Packliste, einen Elterninfo-Brief und so weiter und so weiter.

[3:56] Und wir versuchen uns hier einmal mit künstlicher Intelligenz zu entlasten. Hier seht ihr beispielsweise die große Stärke auch von Claude.

[4:04] Wir bekommen nicht nur eine komplette Planung unserer Klassenreise inklusive Budget- Population und Co.

[4:09] als dazu gelagerte Dokumente, sondern auch sachdienliche Hinweise, was gut zu einer Klasse passen würde und was aufgrund des Alters vielleicht noch nicht so angemessen ist.

[4:23] Auch ein Elternbrief ist in den entsprechenden Dokumenten zu finden. Somit hat man sich relativ gut vorentlastet für die Klassenreise.

[4:32] Du merkst direkt, wie diese Aufgaben dich entlasten können. Hunderte kleine Aufgaben je um 10 Minuten verkürzt.

[4:39] Das ist ein ganzer Schultag pro Woche, den du zurückbekommst. Take-away. Einstiege, E-Mails vereinfachen, Feedbacks, Quizzes und sogar die Klassenfahrtplanung.

[4:47] Künstliche Intelligenz killt die kleinen Reibungen im Unterricht wie in der Verwaltung. In der nächsten Lektion geht es um Differenzierung und Individualisierung in Minuten.

[END 5:05]`,

  "s2-12": `[0:01] Der vielleicht stärkste Hebel von künstlicher Intelligenz für den Unterricht, Differenzierung und Individualisierung.

[0:07] Das, wofür im Alltag oft die Zeit fehlt, geht jetzt in Minuten. Das Grundprinzip ist simpel. Eine Aufgabe, drei Niveaus. Ich nehme eine bestehende Aufgabe und lasse sie mir in mehreren Schwierigkeitsstufen ausgeben.

[0:21] Ich starte mit einer normalen Aufgabe und prompte, erstelle mir eine Aufgabe für eine 7. Klasse zum Thema Französische Revolution.

[0:30] Er gibt mir drei Varianten. Vereinfachte für leistungsschwächere Schüler, das Original und eine anspruchsvollere.

[0:37] Also quasi zwei Differenzierungsstufen vom Original. Und ihr seht direkt, wir haben hier unterschiedliches Material bekommen.

[0:45] Eine wichtige Zusatzfunktion. Hier kann man beispielsweise den Inhalt kopieren. Man kann ihn aber auch direkt herunterladen als PDF-Dokument oder als Word-Dokument, wenn man noch eigenständige Änderungen an dem Inhalt vornehmen möchte.

[0:58] Man hat aber auch immer die Möglichkeit, über diesen Bearbeiten-Button selbst noch sozusagen mit künstlicher Intelligenz Änderungen vorzunehmen.

[1:04] Und wir gucken über die Ergebnisse. Das ist ganz schön. Wir sehen hier, es gibt insgesamt drei Varianten in unterschiedlichen Anforderungsniveaus.

[1:14] Jetzt möchten wir aber vielleicht auch noch differenzieren für DaZ-Schülerinnen oder Inklusion und haben hier die Möglichkeit zu sagen, ihr denselben Text zusätzlich auf Sprachniveau A2, kurze Sätze, einfacher Wortschatz.

[1:28] Und wir sehen direkt, wir haben unterschiedliche Fassungen bekommen auf dem Sprachniveau A2.

[1:33] Und genau, das sieht soweit ganz gut aus. Ein Hinweis, der mir wichtig ist. Einfache Sprache ist nicht dasselbe wie leichte Sprache.

[1:42] Leichte Sprache ist ein geprüfter Standard mit eigenen Regeln. Für den schnellen Alltag ist KI einfache Sprache großartig.

[1:49] Für offizielle leichte Sprachedokumente brauchst du spezialisierte Anbieter. Dazu aber mehr in Modul 1.

[1:56] Grundsätzlich ist der Gewinn aber riesig. Differenzierung scheitert im Alltag fast nie am Wollen, sondern eher an der Zeit.

[2:04] Genau die gibt dir künstliche Intelligenz zurück. Und am Ende profitieren die Schülerinnen und Schüler, weil jeder Material auf dem passenden Niveau bekommt.

[2:13] Take-away. Eine Aufgabe, drei Niveaus, ein Prompt. Differenzierung scheitert nicht mehr an der Zeit.

[2:20] In der nächsten Lektion gehen wir den Text hinaus. Bild, Stimme und Recherche.

[END 2:27]`,

  "s2-13": `[0:03] Bisher haben wir nur getippt, aber moderne künstliche Intelligenz kann viel mehr als Text.

[0:09] Ich gebe dir einen schnellen Überblick, damit du weißt, was es gibt. Tief eintauchen werden wir später, vor allem in Modul 4.

[0:16] Bild Künstliche Intelligenz kann Bilder erzeugen, von der Illustration für Arbeitsblätter bis zur Karikatur für den Geschichtsunterricht.

[0:23] Ein prompt wie kindgerechtes Schaubild zum Wasserkreislaufbeschriften liefert in 30 Sekunden, was sonst eine Stunde in einem Grafikprogramm gekostet hätte.

[0:34] Bild verstehen Umgekehrt kannst du Künstliche Intelligenz auch ein Foto geben, etwa von einem Tafelbild oder einem Arbeitsblatt, und sie wertet es aus, transkribiert oder erklärt es.

[0:45] Das ist riesig für die Nachbereitung. Stimme Du kannst mit der Künstlichen Intelligenz sprechen statt tippen, praktisch die ganze Zeit, und es gibt Tools, die Texte in natürlich klingende Sprache verwandeln können.

[0:57] Und etwas sehr Praktisches, das oft übersehen wird. Du bist nicht auf den Chattext festgelegt.

[1:04] Bitte die Künstliche Intelligenz einfach dir das Ergebnis im passenden Dateiformat auszugeben.

[1:09] Als Word-Dokument zum Weiterbearbeiten, als Excel-Tabelle für Listen und Kalkulationen oder als fertiges PDF zum Ausdrucken.

[1:16] Gib mir die Materialliste als Excel-Tabelle oder mach daraus ein sauberes PDF-Arbeitsblatt.

[1:22] Und du lädst es direkt herunter und nutzt es weiter. Ihr findet hier auch verlinkt einen Speech-to-Text-Tipp von mir, den ich häufig nutze, wenn ich lange E-Mails schreiben möchte oder wenn ich lange Dokumente erstelle.

[1:35] Recherche und aktuelle Infos Erinnerst du dich an den Trainingsstichtag aus den vorherigen Lektionen?

[1:43] Manche Tools können das umgehen, weil sie live im Internet suchen. Perplexity ist dafür bekannt, aber ChatGPT, Claude und Gemini können es mittlerweile auch sehr gut.

[1:54] Der große Vorteil, sie zeigen dir Quellenlinks, die du anklicken und prüfen kannst. Ein direktes Gegenmittel gegen Halluzinationen. Dann gibt es noch spezialisierte Schultools wie Magic School, Fobizz oder NotebookLM, die für den Bildungsbereich gebaut sind.

[2:10] Die schauen wir uns im Verlauf des Kurses an. Du musst sie jetzt nicht direkt kennenlernen. Lass dich von der Fülle nicht erschlagen. Der Kern bleibt immer derselbe.

[2:20] Ein klarer Prompt, im Dialog nachsteuern, Fakten prüfen. Alles andere sind Variationen. Take-away Künstliche Intelligenz kann Bild, Stimme, Live-Recherche und Ausgabe als Word, Excel oder PDF.

[2:34] Nicht nur als Chattext. Der Crashkurs kommt an sein Ende. Die Tiefe kommt in den Modulen. In der nächsten Lektion bekommst du noch einen letzten Crashkursauftrag.

[END 2:49]`,

  "s2-14": `[0:00] Wissen wird erst durch Tun zu Können. Darum schließen wir den Crashkurs mit einem kleinen, machbaren Praxisauftrag ab.

[0:07] Deine Aufgabe – erstelle mit künstlicher Intelligenz ein Material, das du in deiner nächsten Unterrichtswoche wirklich gebrauchen kannst.

[0:15] Frei nach Wahl – ein Stundeneinstieg, ein kurzes Quiz, eine vereinfachte Textfassung, eine Eltern-E-Mail, irgendwas Echtes aus deinem Alltag.

[0:23] Drei Vorgaben dabei. 1. Nutze bewusst die vier Prompt-Bausteine aus den vorherigen Lektionen – Rolle, Aufgabe, Kontext, Format.

[0:32] 2. Bleib im Dialog und steuere mindestens einmal nach. 3. Wenn Fakten da drinstehen, prüfe sie außerhalb der künstlichen Intelligenz.

[0:43] Das Ziel ist nicht Perfektion, das Ziel ist, dass du einmal den kompletten Weg gegangen bist – vom Prompt über das Nachsteuern bis zum fertigen, geprüften Material.

[0:53] Dieser eine Durchlauf nimmt dir die letzte Hemmschwelle. Und keine Sorge, wenn beim ersten Mal nicht alles glattläuft.

[1:00] Genau das ist Sinn der Übung. Die wirklich tiefen Sachen – eine ganze Unterrichtseinheit bauen, KI-Assistenten erstellen, mit Plagiaten umgehen – kommen in den nächsten Modulen.

[1:10] Du hast aber ab hier das Fundament. Take-away. Ein echtes Material, vier Bausteine, einmal nachsteuern, Fakten prüfen, dann bist du startklar für die Module.

[1:21] Danach kannst du dein Crashkurs-Wissen im Quiz direkt unter diesem Video überprüfen. Ich drücke dir die Daumen für die erste Leistungsüberprüfung im KI-Komplettkurs.

[END 1:32]`,

};

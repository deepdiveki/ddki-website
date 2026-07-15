// Aufnahme-Skripte pro Video-Lektion — automatisch aus den tatsächlichen Aufnahmen
// (Whisper-Transkript, Marken/Bindestriche normalisiert). Stand: 2026-07-15.

export const s1Scripts: Record<string, string> = {
  "s1-1": `[0:00] Hallo und herzlich willkommen! Schön, dass du dabei bist. Mein Name ist Björn Isenbiel. Ich bin Lehrer in Hamburg und CEO von DeepDiveKI

[0:08] Außerdem bin ich noch wissenschaftlicher Mitarbeiter an der Leuphana Universität in Lüneburg, wo ich eine Dissertation im Bereich künstlicher Intelligenz schreibe.

[0:18] Ich werde dich durch diesen kompletten Kurs begleiten. Lass mich kurz sagen, worum es hier geht.

[0:23] Dieser Kurs hat ein Ziel, dass du künstliche Intelligenz souverän und sinnvoll in deinen Schulalltag einsetzt.

[0:29] Nicht als Spielerei, sondern als echtes Werkzeug, das dir Arbeit abnimmt und deinen Unterricht besser macht.

[0:36] Und ich verspreche dir, wir bleiben die ganze Zeit praxisnah. Du wirst mir ständig über die Schulter gucken, echte Beispiele sehen und vieles selbst ausprobieren.

[0:46] Kein trockenes Theoretisieren. Wir bauen Dinge, die du am nächsten Tag in deiner Klasse einsetzen kannst.

[0:53] Lass mich dir zwei Beispiele geben, damit du eine Vorstellung bekommst, was dich erwartet.

[0:58] Erstens, du wirst lernen, wie du gemeinsam mit Claude im Coworking eine komplette Unterrichtseinheit entwickelst, inklusive passender Klausur und dem dazugehörigen Erwartungshorizont.

[1:09] Von der ersten Idee bis zum fertigen, bewertbaren Material. Zweitens wirst du sehen, wie KI-Assistenten direkt im Unterricht eingesetzt werden, also kleine spezialisierte Helfer, die du einmal baust und dann immer wieder nutzt.

[1:24] Das sind nur zwei von vielen unterschiedlichen Anwendungen. Aber sie zeigen dir schon jetzt, hier geht es um echte, fertige Ergebnisse und konkrete Skills, nicht um graue Theorie.

[1:35] Vielleicht bist du gerade ein bisschen skeptisch oder überfordert von dem ganzen KI-Hype. Das ist völlig normal und du bist damit nicht alleine.

[1:43] Genau deshalb starten wir ganz unten und bauen Schritt für Schritt auf. Du brauchst hier für diesen Kurs keinerlei Vorkenntnisse.

[1:50] In den nächsten Lektionen zeige ich dir, wer hinter diesem Kurs steckt, für wen er gedacht ist und wie du am meisten herausholst.

[1:57] Danach geht es direkt los. Takeaways. Willkommen! Dieser Kurs macht dich Schritt für Schritt fit für KI im Schulalltag, ganz ohne Vorkenntnisse.

[END 2:09]`,

  "s1-2": `[0:01] Bevor wir loslegen, kurz zu uns, denn du sollst ja wissen, mit wem du hier lernst. Ich bin Björn, mich kennst du ja bereits, CEO von DieblerFKI und Lehrer an der Stadtteilschule Alter Teichweg in Hamburg.

[0:12] Ich unterrichte Informatik, PGW, Geschichte und Sport. Außerdem bin ich wissenschaftlicher Mitarbeiter an der Leuphana Universität in Lüneburg und schreibe an meiner Dissertation zur künstlichen Intelligenz in der Bildung.

[0:25] Also siehst du, hier fließen Praxis und Forschung zusammen. Vieles, was du in diesem Kurs siehst, ist direkt aus meinem eigenen Unterricht entstanden.

[0:35] Hinter dem Kurs und vielen anderen Ideen steht aber ein ganzes Team. Tim Philipp, ebenfalls CEO von DieblerFKI und Lehrer für Informatik und Sport und Dr.

[0:46] Antonius Bär-Oliva, Dozent für Künstliche Intelligenz und Sprache, Englisch und Deutsch sowie Hauptseminarleiter am Lehrerinstitut Hamburg.

[0:54] Ich führe dich zwar als ein durchgängiger Dozent durch den Kurs, aber im Rücken habe ich die Substanz dieses dreiköpfigen Fachteams.

[1:02] An vielen Stellen wirst du hören, das ist ein Tipp von Tim oder Toni legt Wert darauf, dass, weil hier echte Praxiserfahrungen aus mehreren Köpfen zusammenfließen.

[1:13] Denn das ist uns wichtig. Wir sind keine Tech-Firma, die Lehrerinnen von außen erklärt, wie Schule geht.

[1:19] Wir unterrichten selbst aktiv. Alles, was wir dir hier zeigen, haben wir vorher im echten Klassenraum erprobt.

[1:25] Takeaways. Du lernst von einem aktiven Lehrerteam aus Hamburg. Praxis, die im echten Klassenraum erprobt wurde.

[END 1:34]`,

  "s1-3": `[0:00] damit du gleich weißt, ob du hier richtig bist. Für wen ist dieser Kurs gemacht? Kurz gesagt für Lehrkräfte aller Schulformen von der Grundschule bis zur Oberstufe jedes Fach, egal ob du Mathe in der Sekundarstufe 1, Sachunterricht in der Grundschule oder Geschichte im Leistungskurs gibst.

[0:16] Die Methoden lassen sich übertragen und ich zeige dir an vielen Stellen genau wie. Und ganz wichtig, dieser Kurs ist ein Mischpublikum.

[0:24] Du musst kein Technikprofi sein. Wenn du noch nie mit ChatGPT gearbeitet hast, perfekt.

[0:30] Wir fangen bei Null an. Wenn du Künstliche Intelligenz schon nutzt, auch perfekt. Du kannst die Grundlagen dann einfach überspringen und direkt tiefer einsteigen.

[0:39] Für wen ist dieser Kurs weniger geeignet? Wenn du eine rein technische, theoretische Abhandlung über neuronale Netze und die Mathematik dahinter suchst, das findest du hier nicht.

[0:49] Wir bleiben bewusst praxis- und unterrichtsorientiert. Mein Versprechen an alle Niveaus. Niemand wird abgehängt und niemand wird sich hier langweilen.

[0:57] Genau dafür gibt es gleich in der nächsten Lektion verschiedene Lernpfade. Take-away. Alle Schulformen, alle Fächer, jedes Vorkenntnisniveau.

[1:06] Praxisorientiert statt Technik-theoretisch.

[END 1:12]`,

  "s1-4": `[0:00] Dieser Kurs ist groß, rund 13 Stunden Video. Du musst aber nicht alles strikt der Reihe nachmachen.

[0:06] Es gibt drei Lernpfade, je nachdem wo du stehst und was du brauchst. Pfad 1, der Komplettpfad für Einsteigerinnen und Einsteiger.

[0:15] Du gehst einfach linear durch alle Sektionen von vorne bis hinten. Das ist der sicherste Weg, wenn KI relativ neu für dich ist.

[0:23] So verpasst du nichts und baust solide auf. Der zweite Pfad, der Schnellstart für Erfahrene.

[0:30] Wenn du KI schon nutzt, siehe dir kurz unsere Einstiegssektion an. Überspringe oder überfliege vielleicht den Crashkurs und springe dann direkt ins Modul 1.

[0:40] Danach Modul 2, Modul 3 und Modul 4 und gegebenenfalls den Bonus. So pickst du dir gezielt das Fortgeschrittene heraus und holst am besten das heraus, was für dich wichtig ist.

[0:54] Der dritte Pfad, der Themenpfad für gezielte Fragen. Du hast ein konkretes Problem, etwa wie gehe ich mit KI-Plagiaten um?

[1:03] Dann springe direkt in das passende Modul. Das ist in diesem Fall Modul 2. Die Module funktionieren auch einzeln und in beliebiger Reihenfolge.

[1:11] Mein Tipp, egal welcher Pfad, mach mit statt nur zu schauen. Hab ein zweites Gerät vielleicht offen und pausiere oft.

[1:19] Probiere selber aus und versuche das Gelernte in dein alltägliches Handeln zu überführen. KI lernt man nicht durch zusehen, sondern hauptsächlich durch selber tun.

[1:30] Und natürlich nutze die Download-Funktion. Zu fast jeder Lektion gibt es Prompts, Vorlagen, PDFs oder weiteres Material zum Mitnehmen.

[1:39] Dazu mehr in Lektion 1. 6. Take-away. Drei Pfade. Komplett, Schnellstart, Themenpfad. Wähle dein und vor allem mach aktiv mit.

[1:49] Direkt unter diesem Video wartet der Lernpfad-Wizard auf dich. Du kannst ein paar Fragen beantworten und herausfinden, welcher Pfad am besten zu dir passt.

[2:01] Viel Erfolg!

[END 2:03]`,

  "s1-5": `[0:01] Lass uns kurz ans Ende denken. Was kannst du, wenn du diesen Kurs durch hast? Ich finde, man sollte von Anfang an wissen, wohin die Reise geht.

[0:11] 1. Du nutzt künstliche Intelligenz souverän zur Unterrichtsvorbereitung. Von der Themenfindung über Arbeitsblätter bis zur Differenzierung.

[0:20] Das spart dir jede Woche echt viele Stunden Vorbereitungszeit. 2. Du gehst kompetent mit den heiklen Themen unserer Zeit um.

[0:29] Plagiate, Hausaufgaben und Klausuren in Zeiten von künstlicher Intelligenz. Du weißt, was künstliche Intelligenz kann, wie Schülerinnen und Schüler sie nutzen und wie du fair und realistisch damit umgehen kannst.

[0:43] 3. Du hast deine eigenen KI-Assistenten gebaut. Kleine, wiederverwendbare Helfer für dich und deine Klasse.

[0:50] Das klingt jetzt vielleicht groß, aber du wirst sehen, es ist deutlich einfacher, als du vielleicht denkst.

[0:58] 4. Du kannst künstliche Intelligenz in Kompetenzen einordnen und reflektieren. Chancen und Risiken in Schule und Gesellschaft für dich evaluieren.

[1:10] Und du hast Argumente für Kollegium, Eltern und Klassen und ein Spiralkurrikulum für deine Schule.

[1:17] Das ist eine Menge, aber wir gehen es Schritt für Schritt an. Take-away. Am Ende bereitest du Unterricht mit künstlicher Intelligenz vor, gehst souverän mit Klausuren und Plagiaten um, hast eigene KI-Assistenten gebaut und kannst künstliche Intelligenz für dich reflektieren und einordnen.

[END 1:37]`,

  "s1-6": `[0:01] Kurz zu dem, womit wir arbeiten, damit Du weißt, was auf Dich zukommt und was Du brauchst.

[0:07] Im Zentrum stehen die drei großen KI-Plattformen, Chachiviti, Claude und Gemini. Die schauen wir uns gleich im Crashkurs genauer an.

[0:14] Dazu kommen, je nach Thema, ergänzende Tools, z. B. Perplexity und NotebookLM für Recherche, Magic School und Fobizz speziell für Schulen oder ElevenLabs und Zuno für Stimme und Musik.

[0:26] Aber keine Sorge, ich werfe Dir jetzt nicht alle Tools auf einmal an den Kopf. Jedes Tool kommt genau dann, wenn wir es brauchen, mit einer kurzen Einführung.

[0:36] Das Wichtigste vorab. Du brauchst keine teuren Abos. Für fast alles im Kurs reichen die kostenlosen Versionen.

[0:43] Wo ein Bezahlfeature wirklich etwas bringt, sage ich es Dir ausdrücklich. Aber Du kannst den ganzen Kurs auch komplett kostenlos durcharbeiten.

[0:51] Und dann die Downloads. Zu den Lektionen gibt es Prompts zum Kopieren, Vorlagen, Checklisten und PDFs.

[0:58] Lad sie Dir herunter und leg Dir eine eigene kleine Bibliothek an. Das ist der Schatz, den Du nach dem Kurs täglich nutzen kannst.

[1:05] Take-away. Drei Hauptplattformen plus ergänzende Tools. Alles auch kostenlos machbar. Und zu jeder Lektion Downloads für Deine Praxis.

[END 1:18]`,

  "s1-8": `[0:00] Du hast es durch die Einstiegssektion geschafft, jetzt geht es an die Substanz. Lass mir dir kurz sagen, wie es weitergeht.

[0:06] Als nächstes kommt der Crashkurs KI. Der hat eine einzige Aufgabe. Egal, wo du gerade stehst, danach stehen wir alle auf derselben Startlinie.

[0:15] Wir klären, was künstliche Intelligenz eigentlich ist, du legst deine ersten Accounts an und schreibst deine ersten Prompts und siehst sofort die ersten Anwendungen für deinen Unterricht.

[0:26] Wenn du künstliche Intelligenz schon nutzt, darfst du den Crashkurs natürlich auch überfliegen und direkt ins Modul 1 springen.

[0:33] Aber ein kurzer Blick lohnt sich fast immer. Erfahrungsgemäß ist da auch für Fortgeschrittene noch der ein oder andere Aha-Moment dabei.

[0:40] Eine letzte Bitte. Bevor du startest, sei neugierig und sei geduldig mit dir. Die ersten Versuche fühlen sich vielleicht ungewohnt an.

[0:48] Das ist normal. Niemand wird über Nacht zum KI-Profi. Aber mit jeder Lektion wirst du sicherer und du kannst nichts kaputt machen.

[0:55] Ich freue mich, dass du dabei bist. Wir sehen uns gleich im Crashkurs. Take-away. Jetzt geht's los. Als nächstes der Crashkurs. Sei neugierig, sei geduldig und mach aktiv mit.

[END 1:08]`,

};

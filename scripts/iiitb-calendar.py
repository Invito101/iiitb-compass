from datetime import datetime
from ics import Calendar, Event as ICSEvent
import pytz

def make_event(name, start, end=None):
    events = []

    tz = pytz.timezone("Asia/Kolkata")

    if end and (end - start).days > 14:
        start_event = ICSEvent(name=f"{name} Start")
        start_event.begin = tz.localize(start)
        start_event.make_all_day()
        events.append(start_event)

        end_event = ICSEvent(name=f"{name} End")
        end_event.begin = tz.localize(end)
        end_event.make_all_day()
        events.append(end_event)
    else:
        event = ICSEvent(name=name)
        event.begin = tz.localize(start)
        if end:
            event.end = tz.localize(end)
        event.make_all_day()
        events.append(event)

    return events


holiday_ICSEvents = [
    make_event("Makara Sankranti", datetime(2025, 1, 14)),
    make_event("Maha Shivaratri", datetime(2025, 2, 26)),
    make_event("Holi", datetime(2025, 3, 14)),
    make_event("Ramzan", datetime(2025, 3, 31)),
    make_event("Ambedkar Jayanti", datetime(2025, 4, 14)),
    make_event("May Day", datetime(2025, 5, 1)),
    make_event("Varamahalakshmi", datetime(2025, 8, 8)),
    make_event("Independence Day", datetime(2025, 8, 15)),
    make_event("Ganesha Chaturthi", datetime(2025, 8, 27)),
    make_event("Mahanavami", datetime(2025, 10, 1)),
    make_event("Gandhi Jayanthi & Vijayadashami", datetime(2025, 10, 2)),
    make_event("Naraka Chaturdashi", datetime(2025, 10, 20)),
    make_event("Christmas", datetime(2025, 12, 25)),
    make_event("Republic Day", datetime(2025, 1, 26)),
    make_event("Ugadi", datetime(2025, 3, 30)),
    make_event("Kannada Rajyotsava", datetime(2025, 11, 1)),
]

nid_cid_ICSEvents = [
    make_event("Non-Instruction Day: Spandan", datetime(2025, 1, 24)),
    make_event("Compensatory Instruction Day: Spandan", datetime(2025, 1, 19)),
    make_event("Non-Instruction Day: Infin8", datetime(2025, 2, 7)),
    make_event("Compensatory Instruction Day: Infin8", datetime(2025, 2, 1)),
    make_event("Non-Instruction Day: RISE Colloquium", datetime(2025, 2, 21)),
    make_event("Compensatory Instruction Day: RISE Colloquium", datetime(2025, 2, 22)),
    make_event("Non-Instruction Day (Half Day): Women’s Day", datetime(2025, 3, 19)),
    make_event("Compensatory Instruction Day: Women’s Day", datetime(2025, 3, 22)),
    make_event("Non-Instruction Day (Half Day): Bangalore on IT", datetime(2025, 8, 20)),
    make_event("Compensatory Instruction Day: Bangalore on IT", datetime(2025, 8, 23)),
    make_event("Non-Instruction Day (Half Day): Onam", datetime(2025, 9, 10)),
    make_event("Compensatory Instruction Day: Onam", datetime(2025, 9, 13)),
    make_event("Non-Instruction Day: Umang", datetime(2025, 10, 31)),
    make_event("Compensatory Instruction Day: Umang", datetime(2025, 10, 25)),
    make_event("Non-Instruction Day: Synergy", datetime(2025, 11, 7)),
    make_event("Compensatory Instruction Day: Synergy", datetime(2025, 11, 15)),
    make_event("Non-Instruction Day (Half Day): Karnataka Rajyotsava", datetime(2025, 11, 12)),
    make_event("Compensatory Instruction Day: Karnataka Rajyotsava", datetime(2025, 11, 15)),
]

awareness_ICSEvents = [
    make_event("National Youth Day", datetime(2025, 1, 12)),
    make_event("World Energy Day", datetime(2025, 2, 14)),
    make_event("National Science Day", datetime(2025, 2, 28)),
    make_event("World Water Day", datetime(2025, 3, 22)),
    make_event("World Health Day / Medical Camp", datetime(2025, 4, 7)),
    make_event("World Earth Day", datetime(2025, 4, 22)),
    make_event("National Technology Day", datetime(2025, 5, 11)),
    make_event("World Environment Day", datetime(2025, 6, 5)),
    make_event("International Literacy Day", datetime(2025, 9, 8)),
    make_event("World Food Day", datetime(2025, 10, 16)),
    make_event("Rastriya Ekta Diwas", datetime(2025, 10, 31)),
    make_event("National Library Week", datetime(2025, 11, 14), datetime(2025, 11, 20)),
    make_event("Human Rights Day", datetime(2025, 12, 10)),
]

campus_ICSEvents = [
    make_event("New Year Celebration", datetime(2025, 1, 1)),
    make_event("Confluence 2025", datetime(2025, 1, 18)),
    make_event("Republic Day", datetime(2025, 1, 26)),
    make_event("Spandan (Sports Festival)", datetime(2025, 1, 24), datetime(2025, 1, 26)),
    make_event("Infin8", datetime(2025, 2, 7), datetime(2025, 2, 9)),
    make_event("RISE - Open House", datetime(2025, 2, 15)),
    make_event("RISE - Tech Fest", datetime(2025, 2, 15)),
    make_event("Sangam (Alumni Day)", datetime(2025, 2, 15)),
    make_event("RISE - PhD Colloquium", datetime(2025, 2, 21)),
    make_event("IIIT-B League Phase 2", datetime(2025, 3, 21), datetime(2025, 3, 23)),
    make_event("Miles for Meals", datetime(2025, 4, 6)),
    make_event("International Yoga Day", datetime(2025, 6, 20)),
    make_event("Annual Convocation", datetime(2025, 7, 6)),
    make_event("Independence Day", datetime(2025, 8, 15)),
    make_event("Bangalore on IT", datetime(2025, 8, 20)),
    make_event("National Sports Day", datetime(2025, 8, 29)),
    make_event("Teachers Day Celebrations / Blood Donation", datetime(2025, 9, 5)),
    make_event("Onam", datetime(2025, 9, 10)),
    make_event("IIIT-B League Phase 1", datetime(2025, 9, 12), datetime(2025, 9, 14)),
    make_event("27th Foundation Day", datetime(2025, 9, 18)),
    make_event("UMANG", datetime(2025, 10, 31), datetime(2025, 11, 2)),
    make_event("Synergy 25", datetime(2025, 11, 7), datetime(2025, 11, 9)),
    make_event("Karnataka Rajyotsava", datetime(2025, 11, 12)),
    make_event("Kreedostava", datetime(2025, 12, 19)),
]

academic_term_2 = [
    make_event("Term II - Classes", datetime(2025, 1, 2), datetime(2025, 2, 28)),
    make_event("Term II - Grade Improvement Exams (Term I: 2024–2025)", datetime(2025, 2, 3), datetime(2025, 2, 7)),
    make_event("Term II - Mid Term Exams", datetime(2025, 3, 3), datetime(2025, 3, 8)),
    make_event("Term II - Mid Term Break", datetime(2025, 3, 10), datetime(2025, 3, 16)),
    make_event("Term II - Post Mid Term Classes Resume", datetime(2025, 3, 17), datetime(2025, 5, 3)),
    make_event("Term II - End Term Exams", datetime(2025, 5, 5), datetime(2025, 5, 10)),
    make_event("Term II - Term Break", datetime(2025, 5, 12), datetime(2025, 7, 31)),
    make_event("Term II - Result Declaration", datetime(2025, 5, 23)),
    make_event("Term II - Last Day for Thesis Defense (Graduating Batch)", datetime(2025, 6, 13)),
    make_event("Term II - Result Declaration (Graduating Batch)", datetime(2025, 6, 16)),
]

academic_term_1 = [
    make_event("Term I - Classes (Pre Mid Term)", datetime(2025, 8, 4), datetime(2025, 10, 4)),
    make_event("Term I - Grade Improvement Exams (Term II: 2024–2025)", datetime(2025, 9, 1), datetime(2025, 9, 5)),
    make_event("Term I - Mid Term Exams", datetime(2025, 10, 6), datetime(2025, 10, 11)),
    make_event("Term I - Post Mid Term Classes Begin", datetime(2025, 10, 13)),
    make_event("Term I - Mid Term Break", datetime(2025, 10, 20), datetime(2025, 10, 25)),
    make_event("Term I - Post Mid Term Classes Resume", datetime(2025, 10, 27), datetime(2025, 11, 29)),
    make_event("Term I - End Term Exams", datetime(2025, 12, 1), datetime(2025, 12, 6)),
    make_event("Term I - Term Break", datetime(2025, 12, 8), datetime(2025, 12, 31)),
    make_event("Term I - Result Declaration", datetime(2025, 12, 22)),
]

all_events = (
    holiday_ICSEvents +
    nid_cid_ICSEvents +
    awareness_ICSEvents +
    campus_ICSEvents +
    academic_term_1 +
    academic_term_2
)
all_events = sum(all_events, [])

calendar = Calendar()
for event in all_events:
    calendar.events.add(event)

ics_path = "./IIITB_Academic_Calendar_2025.ics"
with open(ics_path, "w") as f:
    f.writelines(calendar)
